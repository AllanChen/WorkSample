//
//  Created by DengJiaming on 14-7-6.
//
//

#ifndef __RSCODE_H__
#define __RSCODE_H__

#define RS_SYMSIZE			5
#define RS_GFPOLY			0x25
#define RS_FCR				1
#define RS_PRIM				1
#define RS_NROOTS			8
#define RS_DATA_LEN			10
#define RS_TOTAL_LEN		(RS_DATA_LEN + RS_NROOTS)
#define RS_PAD				((1<<RS_SYMSIZE) - 1 - RS_TOTAL_LEN)

/*
 * General purpose RS codec, 8-bit symbols.
 */

typedef struct _RS RS;

extern RS *init_rs(int symsize, int gfpoly, int fcr, int prim, int nroots, int pad);
extern void encode_rs_char(RS *rs, const unsigned char *data, unsigned char *parity);
extern int  decode_rs_char(RS *rs, unsigned char *data, int *eras_pos, int no_eras);
extern void free_rs_char(RS *rs);
extern void free_rs_cache(void);

#endif /* __RSCODE_H__ */
