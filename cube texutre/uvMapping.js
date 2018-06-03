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
    //scene.fog = new THREE.Fog(0xffffff, 0.005, 3000);
}

//创建照相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
    //camera.position.set(25, 15, 25);
    camera.position.set(0, 150, 400);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
}

function initLight() {
  light = new THREE.PointLight(0xffffff,1,10000);
  //light.position.set(10, 15, 50);
  light.position.set(0, 1000, 0);
  scene.add(light);
}

//创建物体
function initObject() {
    //var texture = THREE.ImageUtils.loadTexture('http://wow.techbrood.com/uploads/160801/texture-atlas.jpg');
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('http://wow.techbrood.com/uploads/160801/texture-atlas.jpg'),
        side: THREE.DoubleSide
    });
    var geometry = new THREE.BoxGeometry(3000, 3000, 3000);
  	//子图像在贴图中的位置信息，顺序为[左下角，右下角，右上角，左上角]
    var bricks = [new THREE.Vector2(0, .666), new THREE.Vector2(.5, .666), new THREE.Vector2(.5, 1), new THREE.Vector2(0, 1)];
    var clouds = [new THREE.Vector2(.5, .666), new THREE.Vector2(1, .666), new THREE.Vector2(1, 1), new THREE.Vector2(.5, 1)];
    var crate = [new THREE.Vector2(0, .333), new THREE.Vector2(.5, .333), new THREE.Vector2(.5, .666), new THREE.Vector2(0, .666)];
    var stone = [new THREE.Vector2(.5, .333), new THREE.Vector2(1, .333), new THREE.Vector2(1, .666), new THREE.Vector2(.5, .666)];
    var water = [new THREE.Vector2(0, 0), new THREE.Vector2(.5, 0), new THREE.Vector2(.5, .333), new THREE.Vector2(0, .333)];
    var wood = [new THREE.Vector2(.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .333), new THREE.Vector2(.5, .333)];
    
    //清除先前的映射
    geometry.faceVertexUvs[0] = [];

    //每个面分成上下两个三角形渲染, 0下标表示上三角形
    geometry.faceVertexUvs[0][0] = [bricks[0], bricks[1], bricks[3]];
    geometry.faceVertexUvs[0][1] = [bricks[1], bricks[2], bricks[3]];

    geometry.faceVertexUvs[0][2] = [clouds[0], clouds[1], clouds[3]];
    geometry.faceVertexUvs[0][3] = [clouds[1], clouds[2], clouds[3]];

    geometry.faceVertexUvs[0][4] = [crate[0], crate[1], crate[3]];
    geometry.faceVertexUvs[0][5] = [crate[1], crate[2], crate[3]];

    geometry.faceVertexUvs[0][6] = [stone[0], stone[1], stone[3]];
    geometry.faceVertexUvs[0][7] = [stone[1], stone[2], stone[3]];

    geometry.faceVertexUvs[0][8] = [water[0], water[1], water[3]];
    geometry.faceVertexUvs[0][9] = [water[1], water[2], water[3]];

    geometry.faceVertexUvs[0][10] = [wood[0], wood[1], wood[3]];
    geometry.faceVertexUvs[0][11] = [wood[1], wood[2], wood[3]];
  
    cube = new THREE.Mesh(geometry, material
                      //new THREE.MeshPhongMaterial( { map: texture})
   		   );
    scene.add(cube);
}

//渲染循环
function render() {
    requestAnimationFrame( render );
    //cube.rotation.x += .01;
    //cube.rotation.y += .005;
    renderer.render( scene, camera );
}

//自适应窗口大小
function onResize () {
    // 设置透视摄像机的长宽比
    camera.aspect = window.innerWidth / window.innerHeight
    // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
    camera.updateProjectionMatrix()
    // 设置渲染器输出的 canvas 的大小
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function init() {
    initRender();
    initScene();
    initLight();
    initCamera();
    initObject();
    render();
    var controls = new THREE.OrbitControls( camera);
    window.addEventListener('resize', onResize, false);
}
