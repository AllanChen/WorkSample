
#ifdef __cplusplus
extern "C" {
#endif
    
#include "fft.h"
#define LOGI(...) ()
#define LOGW(...) ()
#define show_line() LOGI("%s %d", __func__, __LINE__)
static char *hard_code = "0123456789abcdefghijklmnopqrstuv";

#define FREQ_SIZE (32)
#define BASE_FREQ (18000)
#define FREQ_INTERVAL (64)
static int freqs[FREQ_SIZE] = {-1};
static void init_freqs()
{
    int i;
    if (freqs[0] != -1)
        return;

    for (i = 0; i < FREQ_SIZE; i++) {
        freqs[i] = BASE_FREQ + (i * FREQ_INTERVAL);
    }
}

static unsigned clp2(unsigned x)
{
    x = x - 1;
    x = x | (x >> 1);
    x = x | (x >> 2);
    x = x | (x >> 4);
    x = x | (x >> 8);
    x = x | (x >> 16);
    return x + 1;
}

int char2num(char c) {
    int i;
    for (i = 0; i < strlen(hard_code); i++) {
        if (c == hard_code[i])
            return i;
    }
    return -1;
}

char num2char(int i) {
    if (i < 0 || i >= strlen(hard_code))
        return 'z';
    return hard_code[i];
}


#define AMP_THRESHOLD (0.1)

//static int renderDatas(short *data, int len, int count_of_byte, int msg_len, int sample, char *out) {
extern int renderDatas(int32_t *data , int len, int count_of_byte, int msg_len, int sample, char *out){
    if (data == NULL || out == NULL)
        return -1;

    int real_len = clp2(count_of_byte);
    int i, idx, ret = 0;
    short *raw = malloc(len * sizeof(short));
    float *buf = malloc(sizeof(float) * real_len);
    COMPLEXS *cdata = malloc(sizeof(COMPLEXS) * real_len);
    init_freqs();

    for (i = 0; i < len; i++) {
        raw[i] = data[i] >> 16;
    }

    /*
    float lastMax = 0;
    float lastSec = 0;
    float tempBuf[32];
    float lastBuf[32];
     */
    float tempBuf[32];
    for (idx = 0; idx < msg_len; idx++) {
        for (i = 0; i < real_len; i++) {
            if (i >= count_of_byte) {
                cdata[i].real = 0;
            } else {
                cdata[i].real = raw[i + count_of_byte * idx];
            }
            cdata[i].imag = 0;
        }
        fft_real(cdata, real_len);

        // calculate the AMP
        for (i = 0; i < real_len; i++) {
            double v = sqrt(pow(cdata[i].real, 2) + pow(cdata[i].imag, 2));
            if (i == 0)
                v = v / (double)real_len;
            else
                v = v * 2 / (double)real_len;
            buf[i] = v;
        }
        float max = 0;
        int maxIndex = 0;
        int maxFftIdx = 0;

        // find out the max amp of frequences
        for (i = 0; i < FREQ_SIZE; i++) {
            int fftIdx = (int)(( float)freqs[i] / ((float )sample / 2.0f) * (float )real_len / 2);
            float mt = buf[fftIdx];
            if (fftIdx - 1 >= 0 && buf[fftIdx - 1] > mt)
                mt = buf[fftIdx - 1];
            if (fftIdx + 1 < real_len && buf[fftIdx + 1] > mt)
                mt = buf[fftIdx + 1];
            if (mt < AMP_THRESHOLD)
                mt = 0;
            tempBuf[i] = mt;
            if (mt > max) {
                max = mt;
                maxIndex = i;
            }
            if (fftIdx > maxFftIdx)
                maxFftIdx = fftIdx;
        }

        if (max < AMP_THRESHOLD)
            out[idx] = '*' ;
        else
            out[idx] = hard_code[maxIndex];

    }

    free(raw);
    free(buf);
    free(cdata);
    return ret;
}

    /*
JNIEXPORT jstring JNICALL Java_cn_soundtooth_audioanalyze_MainActivity_renderDatas(
            JNIEnv* env, jobject obj , jshortArray data, int count_of_byte, int msg_len, int sample) {
    jsize len = (*env)->GetArrayLength(env, data);
    char *out = malloc(sizeof(char) * msg_len + 1);
    jstring str;
    int real_len = clp2(count_of_byte);
    int i, idx;
    short *new_data = (*env)->GetShortArrayElements(env, data, NULL);
    short *raw = malloc(len * sizeof(short));
    float *buf = malloc(sizeof(float) * real_len);
    // new_data: audio data, len: audio data length, count_of_byte: count of one bye
    // msg_len: length of tag(20), sample: audio sample, out: output message data
    renderDatas(new_data, len, count_of_byte, msg_len, sample, out);
    out[20] = '\0';
    free(raw);
    free(buf);
    str = (*env)->NewStringUTF(env, out);
    free(out);
    return str;
}
     */

/*
 * decode rs code
 * @data received data with rs code
 * @len received data length
 * @out corrected data with rs code
 * return 0 for success
 */
extern int decodeRsChar(const char *data, int len, char *out) {
    int i, ret;
    if (len != RS_TOTAL_LEN || data == NULL || out == NULL)
        return -1;
    init_freqs();

    char *ders = malloc(sizeof(char) * RS_TOTAL_LEN);

    RS *rs = init_rs(RS_SYMSIZE, RS_GFPOLY, RS_FCR, RS_PRIM, RS_NROOTS, RS_PAD);
    int eras_pos[RS_TOTAL_LEN] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
    for (i = 0; i < RS_TOTAL_LEN; i++)
        ders[i] = char2num(data[i]);

    int count = decode_rs_char(rs, ders, eras_pos, 0);
    if (count >= 0) {
        for (i = 0; i < RS_TOTAL_LEN; i++)
            out[i] = num2char(ders[i]);
        ret = count;
    } else {
        ret = -1;
    }
    free(ders);
    return ret;
}
/**
 * return the correct message if tag+rs is right, or return NULL
 */
    /*
JNIEXPORT jstring JNICALL Java_cn_soundtooth_audioanalyze_MainActivity_decodeRsChar(JNIEnv* env, jobject obj , jcharArray data) {
    int i;
    jsize len = (*env)->GetArrayLength(env, data);
    if (len != RS_TOTAL_LEN)
        return NULL;

    jchar *raw= (*env)->GetCharArrayElements(env, data, NULL);
    char *msg = (char*) malloc(sizeof(char) * len);
    for (i = 0; i < len; i++)
        msg[i] = raw[i];
    char *out = malloc(sizeof(char) * RS_TOTAL_LEN + 1);
    int count = decodeRsChar(msg, len, out);
    jstring str;
    if (count >= 0) {
        str = (*env)->NewStringUTF(env, out);
    } else {
        str = NULL;
    }
    free(out);
    free(msg);
    return str;
}*/


#ifdef __cplusplus
}
#endif