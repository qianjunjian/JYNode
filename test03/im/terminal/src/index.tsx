import { Component } from "react";
import { render } from "react-dom";
import Console, { LogEntry, LogMessage } from 'react-console-component';
import { io } from "socket.io-client";
const socket = io();

import "./main.css";

interface EchoConsoleState {
}

class EchoConsole extends Component<{}, EchoConsoleState> {

    child: {
		console?: Console | null,
	} = {};

    constructor(props: {}) {
        super(props);

        this.state = {
			count: 0,
		}

        socket.on('console', (data: string) => {
			console.log('console receive:', data);
			this.child.console?.log(data);
		})
    }

    echo = (text: string) => {
		socket.emit('console', text)
	}

    promptLabel = () => {
		return 'helloword>> '
	}

    render() {
        return <div>
            <Console ref={ref => this.child.console = ref}
				handler={this.echo}
				promptLabel={this.promptLabel}
				welcomeMessage={"Welcome to Miku!\n"}
				autofocus={true}
			/>
        </div>
    }
}

render(<EchoConsole />, document.getElementById("console"));