import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import TrackballControls from './ref/TrackballControls';

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 30),
      width: window.innerWidth,
      height: window.innerHeight,
      cubeRotation: new THREE.Euler(),
      pause: false,
      fov: 75
    };

    this._onAnimate = () => {
      this.controls.update();
      if (!this.state.pause)
        this.setState({
          cubeRotation: new THREE.Euler(
            this.state.cubeRotation.x + 0.01,
            this.state.cubeRotation.y + 0.01,
            this.state.cubeRotation.z + 0.01
          ),
        });
    };
  }

  componentDidMount() {

    const controls = new TrackballControls(this.refs.camera,
      ReactDOM.findDOMNode(this.refs.react3));

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.addEventListener('change', () => {
      this.setState({
        cameraPosition: this.refs.camera.position,
      });
    });

    window.addEventListener("resize", () => {
      this.setState({
        "width": window.innerWidth,
        "height": window.innerHeight
      })
    })

    window.addEventListener("keyup", e => {
      const { state } = this
      switch (e.keyCode) {
        case 32:
          return this.setState({
            pause: !state.pause
          })
        default:
          return state
      }
    })

    this.controls = controls;
  }

  render() {
    const { width, height, cameraPosition, cubeRotation, fov } = this.state
    return (
      <React3
        ref="react3"
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this._onAnimate} >
        <scene ref="scene">
          <perspectiveCamera
            ref="camera"
            name="camera"
            fov={fov}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={cameraPosition} />
          <GeometryForms rotation={cubeRotation} qnty={5} />
        </scene>
      </React3>
    );
  }
}
export default Simple


class GeometryForms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: []
    }
    this.createForms = this.createForms.bind(this)
  }

  componentDidMount() {
    this.createForms()
  }

  createForms() {
    const elements = []
    const { qnty, rotation } = this.props
    for (let index = 0; index < qnty; index++) {
      const posX = Math.random()
      const posY = Math.random()
      const posZ = Math.random()
      const position = new THREE.Vector3(posX * 20, posY * 20, posZ * 10)
      elements.push(<OneForm rotation={rotation} position={position} />)
    }
    this.setState({
      elements: elements
    })
  }

  render() {
    const { elements } = this.state
    return (
      <group>
        {elements}
        <ambientLight intensity={.7} />
        <pointLight
          color={0x0000FF}
          distance={100}
          position={new THREE.Vector3(3, 3, 3)} />
      </group>
    )
  }
}

class OneForm extends React.Component {
  render() {
    const { position, rotation } = this.props;
    return (
      <mesh rotation={rotation} position={position} >
        < boxGeometry width={3} height={3} depth={3} />
        <meshLambertMaterial color={0xF3FFE2} />
      </mesh>
    )
  }
}

