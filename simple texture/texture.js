var renderer, scene, camera, cube, light;
//绑定canvas和渲染器
function initRender() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
    //清除画面颜色
	renderer.setClearColor(0x000000);
}

//创建照相机
function initScene() {
    scene = new THREE.Scene();
}

//创建照相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(25, 15, 25);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
}

function initLight() {
  light = new THREE.PointLight(0xffffff, 1, 200);
  light.position.set(10, 15, 50);
  scene.add(light);
}

//创建物体
function initObject() {
    var texture = THREE.ImageUtils.loadTexture('http://wow.techbrood.com/uploads/1702/crate.jpg');
    cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10),
                      new THREE.MeshPhongMaterial( { map: texture})
   		   );
    scene.add(cube);
}

//渲染循环
function render() {
    requestAnimationFrame( render );
    cube.rotation.x += .01;
    cube.rotation.y += .005;
    renderer.render( scene, camera );
}

function init() {
    initRender();
    initScene();
    initLight();
    initCamera();
    initObject();
    render();
}
