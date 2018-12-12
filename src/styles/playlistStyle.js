import Background from '../images/fragile.png'

const styles = theme => ({
  list: {
    height: '620px',
    overflow: 'auto',
    background: 'linear-gradient(to right, #424242, #37474F)'
  },
  text: {
    fontFamily: 'Verdana',
    color: 'white'
  },
  iconSmall: {
    fontSize: '12px',
  },
  iconLarge: {
    fontSize: '18px',
  },
  autoRefresh: {
    padding: '0 10px 0 0',
    fontStyle: 'italic',
    color: '#B2EBF2'
  },
  textOwner: {
    fontFamily: 'Verdana',
    fontStyle: 'italic',
    color: '#F4FF81',
    padding: '0 0 0 10px',
  },
  background: {
    // backgroundImage: "url(" + Background + ")",
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    height: '100%',
    background: 'linear-gradient(to right, #424242, #37474F)'
  },
  selectedBorder: {
    borderColor: '#90CAF9',
    borderStyle: 'solid',
    borderWidth: 3,
  }
});

export default styles
