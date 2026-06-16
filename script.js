// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 3;

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

// Earth Texture
const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
);

// Earth
const earthGeometry = new THREE.SphereGeometry(
    1,
    64,
    64
);

const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture
});

const earth = new THREE.Mesh(
    earthGeometry,
    earthMaterial
);

scene.add(earth);

// Clouds
const cloudTexture = textureLoader.load(
    'https://threejs.org/examples/textures/planets/earth_clouds_1024.png'
);

const cloudGeometry = new THREE.SphereGeometry(
    1.01,
    64,
    64
);

const cloudMaterial = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true
});

const clouds = new THREE.Mesh(
    cloudGeometry,
    cloudMaterial
);

scene.add(clouds);

// Stars
const starGeometry = new THREE.BufferGeometry();

const starVertices = [];

for (let i = 0; i < 10000; i++) {
    starVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
    );
}

starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
        starVertices,
        3
    )
);

const starMaterial = new THREE.PointsMaterial({
    size: 0.5
});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(stars);

// Lighting
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    1
);

directionalLight.position.set(
    5,
    3,
    5
);

scene.add(directionalLight);

// Animation
function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.0015;
    clouds.rotation.y += 0.0018;

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();

// Resize
window.addEventListener('resize', () => {
    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
