var renderer, scene, camera, cube, light;
//绑定canvas和渲染器
function initRender() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
    //清除画面颜色
	renderer.setClearColor(0x000000);
}

//创建场景
function initScene() {
    scene = new THREE.Scene();
    //天空盒
    var path = "http://ae01.alicdn.com/kf/";       //设置路径
        var format = '.jpg';                        //设定格式
    var urls = [
       path + 'HTB1GBRUhpooBKNjSZFPq6xa2XXa5'+ format,     
       path + 'HTB1nqDXm98YBeNkSnb4q6yevFXa0'+ format,
       path + 'HTB13tL9vkOWBuNjSsppq6xPgpXay' + format,
       path + 'HTB1VELXvgaTBuNjSszfq6xgfpXac' + format,
       path + 'HTB1PLbTvf9TBuNjy1zbq6xpepXao' + format,
       path + 'HTB1bxWzmZuYBuNkSmRyq6AA3pXa8' + format
        ];
    var textureCube = new THREE.CubeTextureLoader().load( urls );

    scene.background = textureCube; //作为背景贴图
}

//创建照相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
    //camera.position.set(25, 15, 25);
    camera.position.set(0, 150, 400);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
}
// 添加光源
function initLight() {
  light = new THREE.PointLight(0xffffff);
  //light.position.set(10, 15, 50);
  light.position.set(0, 250, 0);
  scene.add(light);
}

//创建天空盒
function initObject() {
    var materialArray = [];
    for (var i = 0; i < 6; i++)
            materialArray.push( new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture( 'http://wow.techbrood.com/uploads/1702/water.jpg'),
                side: THREE.BackSide
            }));
    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    cube = new THREE.Mesh(new THREE.BoxGeometry(2000, 2000, 2000),skyMaterial
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
    // 也可以填加一个超大的立方体作为天空盒
    //initObject();  
    render();
    var controls = new THREE.OrbitControls( camera);
    window.addEventListener('resize', onResize, false);
}
