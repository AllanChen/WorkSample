
cell 居中
<View style={styles.row}>
  <View style={styles.cell}> <Text style={styles.welcome}> cell1 </Text> </View>
  <View style={styles.cell}> <Text style={styles.welcome}> cell2 </Text> </View>
  <View style={styles.cell}> <Text style={styles.welcome}> cell3 </Text> </View>
</View>

cell: {
       flex: 1,
       height: 50,
       backgroundColor: '#aaaaaa'
   },
   welcome: {
       fontSize: 20,
       textAlign: 'center',
       margin: 10
   },

多重CSS 覆盖
<View style={[styles.cellBox,{backgroundColor:'red',width:100}]} >

动态css
rowHeight = function (rowID: number) {
      let pt = 0;
      if (rowID == 0) pt = 23;
      else pt = 10;
      return {
        fontSize: 25,
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#ffffff',
        paddingTop: pt,
        paddingLeft: 10,
      }
    };
<Text style={rowHeight(rowID)}>{addressData[rowID].name}</Text>    

Export 特性：
一定要在class 之外：
export function setVisible(visible) {
    // this.setState({ modalVisible: false });
    this.setModalVisible(false);
 }

 import * as NAME from 'CLASS PATH';

 NAME.setVisible