import React from 'react'

class Music extends React.Component {
    constructor(props) {
        super(props)
        this.audio = new Audio(this.props.url)
        this.audio.loop = true
        this.audio.play()
    }

    componentWillmount(){
        console.log("lala:")
    }

    componentWillUnmount(){
        this.audio.pause()
    }

    render() {
        return (
            <div>
                <span></span>
            </div>
        )
    }
}
  
export default Music