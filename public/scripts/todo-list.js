var TodoList = React.createClass({
  getInitialState : function() {
    return {1: {id: 1, text: "First Item xys", status: "todo"}};
  },
  handleItemChange : function(key) {
    this.state
  },
  listItems : function(){
    return Object.keys(this.state).map(function(key, index){
      var itemObj = this.state[key];
      return <TodoItem data={itemObj} handleItemChange={this.handleItemChange}></TodoItem>
    }.bind(this));
  },
  render : function() {
    return (
      <div>
        <h1>Things to do</h1>
        {this.listItems()}
      </div>
      );
  }
});

var TodoItem = React.createClass({
  render : function() {
    return (
      <div className={this.props.data['status']}>
        <input  type="checkbox" text="asdf"> {this.props.data["text"]}</input>
      </div>
      );
  }
})

appendExample("Todo List",
      function(container_id){
              ReactDOM.render(<TodoList></TodoList>, document.getElementById(container_id));
});
