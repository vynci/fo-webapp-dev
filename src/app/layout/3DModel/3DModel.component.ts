import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';

@Component({
  selector: 'geometry-cube',
  templateUrl: './3DModel.component.html',
  styleUrls: ['./3DModel.component.css']
})
export class ThreeModelComponent implements AfterViewInit {
  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private cube: THREE.Mesh;

  private boat: any;

  private renderer: THREE.WebGLRenderer;

  private scene: THREE.Scene;



  /* CUBE PROPERTIES */
  @Input()
  public rotationSpeedX: number = 0.005;

  @Input()
  public rotationSpeedY: number = 0.01;

  @Input()
  public rotationSpeedZ: number = 0.01;

  @Input()
  public size: number = 200;

  @Input()
  public texture: string = '/assets/textures/crate.gif';

  @Input()
  public jsonFile: string = '/assets/patrol-boat.json';


  /* STAGE PROPERTIES */
  @Input()
  public cameraZ: number = 1;

  @Input()
  public fieldOfView: number = 70;

  @Input('nearClipping')
  public nearClippingPane: number = 1;

  @Input('farClipping')
  public farClippingPane: number = 1000;



  /* DEPENDENCY INJECTION (CONSTRUCTOR) */
  constructor() { }



  /* STAGING, ANIMATION, AND RENDERING */

  /**
   * Animate the cube
   */
  private animateCube() {
    if(this.boat){
    this.boat.rotation.x = this.rotationSpeedX * (Math.PI / 180);
    this.boat.rotation.y = this.rotationSpeedY * (Math.PI / 180);
    this.boat.rotation.z = this.rotationSpeedZ * (Math.PI / 180);
    }

  }

  /**
   * Create the cube
   */
  private createCube() {
    const ambient = new THREE.AmbientLight( 0x444444 );
    this.scene.add( ambient );

    const size = 50;
    const divisions = 50;
    const gridHelper = new THREE.GridHelper( size, divisions );

    const directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();

    gridHelper.position.setY(-2.5);

    this.scene.add( directionalLight );
    this.scene.add( gridHelper );

    const objectLoader = new THREE.ObjectLoader();
    const that = this;

    objectLoader.load(this.jsonFile,
      (object) => {
        this.boat = object
        this.scene.add( this.boat );
    });
  }

  /**
   * Create the scene
   */
  private createScene() {
    /* Scene */
    this.scene = new THREE.Scene();

    /* Camera */
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );

    this.camera.position.set( 18, 18, 18 ); // all components equal
    this.camera.lookAt( this.scene.position ); // or the origin    

    const controls = new OrbitControls(this.camera, this.canvasRef.nativeElement);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ThreeModelComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }



  /* EVENTS */

  /**
   * Update scene after resizing. 
   */
  public onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }



  /* LIFECYCLE */

  /**
   * We need to wait until template is bound to DOM, as we need the view
   * dimensions to create the scene. We could create the cube in a Init hook,
   * but we would be unable to add it to the scene until now.
   */
  public ngAfterViewInit() {
    this.createScene();
    this.createCube();
    this.startRenderingLoop();
  }
}