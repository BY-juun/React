import React from 'react';

class Example2 extends React.PureComponent {
    state = {

    };

    WhoisLogin = () => {
        const { id } = this.props;
        return id !== ''
            ? <div>현재 로그인 id : {id}</div>
            : null
    }

    render() {
        return (
            <>
            {this.WhoisLogin()}
            <form>
                <input type="text" placeholder="title" />
                <input type="text" placeholder="Content" />
                <button>입력!</button>
            </form>
            </>
        );
    }
}

export default Example2;