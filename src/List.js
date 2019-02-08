import React, { Component } from 'react';

class List extends Component {

    constructor(props) {
        super(props);

        const localData = [
            {
                name: "Osman",
                userId: "1",
                skor: "17.0",
                image:"https://pbs.twimg.com/profile_images/583017021383655424/2K169umu_400x400.jpg"

            },
            {
                name: "Furkan",
                userId: "2",
                skor: "15.3",
                image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpwt9TajPAjLlP_crDqkkCxtSu2-1x2ywIO4wkPU9yDVCU81ShEA"
            },
            {
                name: "Mehmet",
                userId: "3",
                skor:"13.1",
                image:"https://lh3.googleusercontent.com/-33owFAsnF2U/U1rKi7sRExI/AAAAAAAABKo/1ybfo8eG-uU/w530-h530-n-rw/TOS_6062.JPG"
            },
            {
                name: "Ersin",
                userId: "4",
                skor:"12.0",
                image:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
            }
        ]
        localStorage.setItem("kisiler", JSON.stringify(localData));



        setTimeout(function () {
            this.setState({
                kisiler: [
                    {
                        name: "Mehmet",
                        userId:"4",
                        skor:"18.3",
                        image:"https://lh3.googleusercontent.com/-33owFAsnF2U/U1rKi7sRExI/AAAAAAAABKo/1ybfo8eG-uU/w530-h530-n-rw/TOS_6062.JPG"
                    },
                    {
                        name: "Osman",
                        userId:"1",
                        skor:"17.1",
                        image:"https://pbs.twimg.com/profile_images/583017021383655424/2K169umu_400x400.jpg"
                    },
                    {
                        name: "Furkan",
                        userId:"2",
                        skor:"15.3",
                        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpwt9TajPAjLlP_crDqkkCxtSu2-1x2ywIO4wkPU9yDVCU81ShEA"
                    },
                    {
                        name: "Ersin",
                        userId:"3",
                        skor:"12.5",
                        image:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
                    }
                ]
            })
        }.bind(this), 7000)
    }

    state = {
        kisiler: JSON.parse(localStorage.getItem("kisiler"))
    }

    /*
    requestAnimationFrame () {
        const child = this.container.children[newData.index];
        child.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        child.style.transition = 'all 0s';
        if (newData.isNewElement) {
            child.style.opacity = '0';
        }

        requestAnimationFrame(() => {
            child.style.transition = 'all 0.5s';
            child.style.transform = 'translate3d(0, 0, 0)';
            if (newData.isNewElement) {
                child.style.opacity = '1';
            }
        });

    }*/

    
    getElementPositions = (newChild = null) => {
        const elements = [];
        this.state.kisiler.forEach((element,index) => {
            const userKey = document.getElementById(element.userId);
            elements.push(userKey.getBoundingClientRect());
        });
        return elements;
        /*
		const { children } = this.props;
		const data = Array.from(this.container.children).reduce((obj, el, index) => {
			obj[children[index].key] = {
				index,
				clientRect: el.getBoundingClientRect(),
				isNewElement: newChild ? newChild[0].key === children[index].key : false,
			};
			return obj;
		}, {});
		return data;*/
	}

    componentDidMount() {
        this.position = this.getElementPositions();
        console.log(this.position);
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps);
        console.log(prevState);
        console.log(snapshot);
        console.log(this.state);

        this.state.kisiler.forEach((element,index) => {
            const userKey = document.getElementById(element.userId);
            const animationDiv = document.getElementById("animationCont");
            const animationMp3 = document.getElementById("animationMp3");
            
            console.log(userKey.getBoundingClientRect());
            requestAnimationFrame(() => {    
                userKey.className = 'animation-item';
                animationDiv.className = "sp-container animation-container";
                animationMp3.play();
            });

            setTimeout(function() {
                animationDiv.className = "sp-container";
            },3000)
            setTimeout(function() {
                userKey.className = 'duration-item';
            },4000)
        });
    }
    


    render() {
        return (
            <div>
                <h3 className="title">Pronet Skor Tablosu</h3>
                <ul className="list">
                    {this.state.kisiler.map((item, index) => {
                        return (
                            <li key={index} id={item.userId} className="duration-item">
                                <div className="skor-width" style={{'width' :item.skor + '%'}}></div>
                                <img src={item.image} alt="" />
                                <span>{item.name}</span>
                                <span>{item.skor} Skor</span>
                            </li>
                        )
                    })}
                </ul>
                <div className="sp-container" id="animationCont">
                    <div className="sp-content">
                        <div className="sp-globe"></div>
                        <h2 className="frame-1"><img src="https://lh3.googleusercontent.com/-33owFAsnF2U/U1rKi7sRExI/AAAAAAAABKo/1ybfo8eG-uU/w530-h530-n-rw/TOS_6062.JPG" height="90" alt="" /> Mehmet</h2>
                    </div>
                    <figure>
                        <figcaption>Listen to the T-Rex:</figcaption>
                        <audio id="animationMp3"
                            controls
                            src="./track.mp3">
                                Your browser does not support the
                                <code>audio</code> element.
                        </audio>
                    </figure>
                    <div className="pyro">
                        <div className="before"></div>
                        <div className="after"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
