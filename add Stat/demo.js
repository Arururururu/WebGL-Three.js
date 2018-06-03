var renderer, scene, camera, cube, light;
var stat = null;
//绑定canvas和渲染器
function initRender() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
    //清除画面颜色
	renderer.setClearColor(0x000000);
}

//初始化Stat
function initStat() {
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.right = '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);
}

//创建场景
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

//添加光源
function initLight() {
  light = new THREE.PointLight(0xffffff, 1, 200);
  light.position.set(10, 15, 50);
  scene.add(light);
}

//创建物体
function initObject() {
    cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10),
                       new THREE.MeshPhongMaterial( { 
        map: THREE.ImageUtils.loadTexture('http://wow.techbrood.com/uploads/1702/clouds.jpg') } )
   		   );
    scene.add(cube);
}

//渲染循环
function render() {
    //表示一帧的开始与结束
    stat.begin();
    requestAnimationFrame( render );
    cube.rotation.x += .01;
    cube.rotation.y += .005;
    stat.end();
    renderer.render( scene, camera );
}

//自适应窗口大小
function onResize () {
    // 设置透视摄像机的长宽比
    camera.aspect = window.innerWidth / window.innerHeight
    // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
    camera.updateProjectionMatrix();
    // 设置渲染器输出的 canvas 的大小
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function init() {
    initRender();
    initStat();
    initScene();
    initLight();
    initCamera();
    initObject();
    render();
    window.addEventListener('resize', onResize, false);
}
