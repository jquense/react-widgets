

module.exports = {

  getInitialState: function(){
    return {
      hovering: null,
      focused: 0
    }
  },

  _onHover: function(idx, e){
    this.setState({ hovering: idx })
  },
}