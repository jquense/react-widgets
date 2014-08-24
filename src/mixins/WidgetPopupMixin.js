var React = require('react')
  , _ =  require('lodash')

module.exports = {
  
  getDefaultState: function(props) {
        var recordHeight = 25
          , recordsPerBody = Math.floor((props.height - 2) / recordHeight);

        return {
            total: props.records.length,
            records: props.records,
            recordHeight: recordHeight,
            recordsPerBody: recordsPerBody,
            visibleStart: 0,
            visibleEnd: recordsPerBody,
            displayStart: 0,
            displayEnd: recordsPerBody * 2
        };
    },
    
    componentWillReceiveProps: function(nextProps) {
        this.setState(this.getDefaultState(nextProps));
        this.scrollState(this.state.scroll);
    },
    
    getInitialState: function() {
        return this.getDefaultState(this.props);
    },

    scrollState: function(scroll) {
        var visibleStart  = Math.floor(scroll / this.state.recordHeight)
           , visibleEnd   = Math.min(visibleStart + this.state.recordsPerBody, this.state.total - 1)
           , displayStart = Math.max(0, Math.floor(scroll / this.state.recordHeight) - this.state.recordsPerBody * 1.5)
           , displayEnd   = Math.min(displayStart + 4 * this.state.recordsPerBody, this.state.total - 1);

        this.setState({
            visibleStart: visibleStart,
            visibleEnd: visibleEnd,
            displayStart: displayStart,
            displayEnd: displayEnd,
            scroll: scroll
        });
    },

    onScroll: React.autoBind(function(event) {
        this.scrollState(this.refs.scrollable.getDOMNode().scrollTop);
    })

}

var GridBody = React.createClass({
    getInitialState: function() {
        return {
            shouldUpdate: true,
            total: 0,
            displayStart: 0,
            displayEnd: 0
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var shouldUpdate = !(
            nextProps.visibleStart >= this.state.displayStart &&
            nextProps.visibleEnd <= this.state.displayEnd
        ) || (nextProps.total !== this.state.total);

        if (shouldUpdate) {
            this.setState({
                shouldUpdate: shouldUpdate,
                total: nextProps.total,
                displayStart: nextProps.displayStart,
                displayEnd: nextProps.displayEnd
            });
        } else {
            this.setState({shouldUpdate: false});
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.shouldUpdate;
    },
    
    render: function() {
        var rows = {};
        
        rows.top = (
            <tr id="gridgridrectop" line="top" style={{height: this.props.displayStart * this.props.recordHeight}}>
                <td colspan="200"></td>
            </tr>
        );

        for (var i = this.props.displayStart; i < this.props.displayEnd; ++i) {
            var record = this.props.records[i];
            rows['line' + i] = (
                <tr class={i % 2 === 0 ? 'w2ui-even' : 'w2ui-odd'} style={{height: this.props.recordHeight}}>
                    <td class="w2ui-grid-data" col="0">
                        <div title={i + 1}>{i + 1}</div>
                    </td>
                    <td class="w2ui-grid-data" col="1">
                        <div title={record.fname}>{record.fname}</div>
                    </td>
                    <td class="w2ui-grid-data" col="2">
                        <div title={record.lname}>{record.lname}</div>
                    </td>
                    <td class="w2ui-grid-data" col="3">
                        <div title={record.email}>{record.email}</div>
                    </td>
                    <td class="w2ui-grid-data-last"></td>
                </tr>
            );
        }
        rows.bottom = (
            <tr id="gridgridrecbottom" line="bottom" style={{
              height: (this.props.records.length - this.props.displayEnd) * this.props.recordHeight
            }}>
                <td colspan="200"></td>
            </tr>
        );
        
        return (
            <table>
              <tbody>
                <tr line="0">
                  <td class="w2ui-grid-data" col="0" style={{height: 0, width: 50}}></td>
                  <td class="w2ui-grid-data" col="1" style={{height: 0, width: 150}}></td>
                  <td class="w2ui-grid-data" col="2" style={{height: 0, width: 150}}></td>
                  <td class="w2ui-grid-data" col="3" style={{height: 0, width: 150}}></td>
                  <td class="w2ui-grid-data-last" style={{height: 0, width: 81}}></td>
                </tr>
                {rows}
              </tbody>
            </table>
        );
    }
});