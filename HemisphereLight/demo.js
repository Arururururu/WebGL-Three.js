var renderer, scene, camera, cube, plane;
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
    camera.position.set(5, 15, 55);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
}

//添加光源
function initLight() {
  //半球光
  var hemiLight = new THREE.HemisphereLight( 0xffff55, 0x00ffff, 0.6 );
  scene.add(hemiLight);

  var helper = new THREE.HemisphereLightHelper( hemiLight, 5 );
  scene.add( helper );
}

//创建物体
function initObject() {
    cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5),
                       new THREE.MeshPhongMaterial( { 
                                color: 0xffffff
                                } )
           );
    cube.position.y = 5;
    cube.castShadow = true;

    scene.add(cube);
  //平面
    plane = new THREE.Mesh(new THREE.PlaneGeometry(80, 80, 16, 16),
                        new THREE.MeshLambertMaterial({color: 0xffffff}));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -3;

    plane.receiveShadow = true; //default

    scene.add(plane);
}

//渲染循环
function render() {
    stat.begin();
    requestAnimationFrame( render );
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
    initCamera();
    initObject();
    initLight();
    render();
    var controls = new THREE.OrbitControls( camera);
    window.addEventListener('resize', onResize, false);
}
