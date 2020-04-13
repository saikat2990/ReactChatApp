import React, { Component } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

class App extends Component {
  constructor() {
    super();
    this.state = { 
      chat: [], 
      clientAmsg: "", 
      clientAnickname: "", 
      clientBmsg:"", 
      clientBnickname:"", 
      msg:"" , 
      nickname:"" 
    };
  }

  componentDidMount() {
    socket.on("chat message", ({ nickname, msg }) => {
      this.setState({
        chat: [...this.state.chat, { nickname, msg }]
      });
    });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit= () =>{
    let { clientAnickname, clientAmsg, nickname, msg,clientBnickname, clientBmsg } = this.state;
    if(clientAmsg===""){
      nickname = clientBnickname;
      msg = clientBmsg;
    }else{
      nickname = clientAnickname;
      msg = clientAmsg;
    }
    socket.emit("chat message", { nickname, msg });
    this.setState({ clientAmsg: "", clientBmsg:"",msg:"" });
  }

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ nickname, msg }, idx) => (
      console.log(idx),
      <div key={idx}>
        <span style={{ color: "green" }}>{nickname}: </span>
        <span>{msg}</span>
      </div>
    ));
  }



  render() {
    return (
      <div className="container-fluid">
       
        <div className="row">
          <form  className="col-5">
            <div>
                <div className="form-group">
                    <span>User Name</span>
                    <input  className="form-control"
                      name="clientAnickname"
                      onChange={e => this.onTextChange(e)}
                      value={this.state.clientAnickname}
                    />
                </div>
                <div className="form-group">
                    <span>Message</span>
                    <input  className="form-control"
                      name="clientAmsg"
                      onChange={e => this.onTextChange(e)}
                      value={this.state.clientAmsg}
                    />
                </div>
                
            </div>
          </form>
          <form className="col-5">
              <div >
                <div className="form-group">
                    <span>User Name</span>
                    <input  className="form-control"
                      name="clientBnickname"
                      onChange={e => this.onTextChange(e)}
                      value={this.state.clientBnickname}
                    />
                </div>
                <div className="form-group">
                <span>Message</span>
                    <input  className="form-control"
                      name="clientBmsg"
                      onChange={e => this.onTextChange(e)}
                      value={this.state.clientBmsg}
                    />
                </div>
               
              </div>
          </form>
         
        </div>
        <button  className="btn-primary" onClick={this.onMessageSubmit}>Send</button>
        <div className="card mt-5">{this.renderChat()}</div>
    
      </div>
    );
  }
}

export default App;