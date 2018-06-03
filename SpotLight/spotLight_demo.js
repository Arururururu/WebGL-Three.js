var renderer, scene, camera, cube, light, plane;
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
    //camera.position.set(25, 15, 25);
    camera.position.set(5, 15, 25);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
}

//添加光源
function initLight() {
  light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);//new THREE.PointLight(0xffffff, 1, 200);
  light.position.set(10, 5, 3);
  //追踪cube
  light.target = cube;
  //环境光
  var ambient = new THREE.AmbientLight(0x666666);
  scene.add(ambient);
  scene.add(light);
}

//创建物体
function initObject() {
    cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5),
                       new THREE.MeshPhongMaterial( { 
        map: THREE.ImageUtils.loadTexture('http://wow.techbrood.com/uploads/1702/clouds.jpg') } )
   		   );
    cube.castShadow = true;
    scene.add(cube);
  //平面
    plane = new THREE.Mesh(new THREE.PlaneGeometry(80, 80, 16, 16),
                        new THREE.MeshLambertMaterial({color: 0xffffff}));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -4;
    scene.add(plane);
}

//渲染循环
var isLeft = true;
function render() {
    stat.begin();
    requestAnimationFrame( render );
   //沿着x轴来回移动
    if (cube.position.x < 18 && isLeft) {
       cube.position.x += .1;
     } else if (cube.position.x > -18){
       cube.position.x -= .1;
       isLeft = false;
     } else {
       isLeft = true;
     }
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
    //物体创建要在光源创建前完成
    initLight();
    render();
    var controls = new THREE.OrbitControls( camera);
    window.addEventListener('resize', onResize, false);
}
