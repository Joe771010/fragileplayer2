const styles = theme => ({
  border: {
    borderColor: '#D50000',
    borderStyle: 'dashed',
  },
  table: {
    height: '585px',
    overflow: 'auto',
    borderRadius: '5px',
    background: 'linear-gradient(to left, #424242, #37474F)'
  },
  header: {
    // background: 'linear-gradient(to left, #424242, #37474F)',
    // position: 'sticky',
    // top: 0,
    // zIndex: 15,
  },
  headerCell: {
    fontFamily: 'Verdana',
    fontSize: '14pt',
    color: '#F48FB1',
    position: 'sticky',
    backgroundColor: "#424242",
    // background: 'linear-gradient(to left, #424242, #37474F)',
    top: 0,
    zIndex: 10,
  },
  headerPosition: {
    position: 'sticky',
  },
  cell: {
    fontFamily: 'Verdana',
  },
  pagination: {
    //fontFamily: 'Microsoft JhengHei',
  }
});

export default styles
