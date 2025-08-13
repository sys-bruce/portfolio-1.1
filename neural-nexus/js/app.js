// Initialize 3D Hologram
const initHologram = () => {
  const container = document.getElementById('hologram-container');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(300, 300);
  container.appendChild(renderer.domElement);

  // Create quantum core
  const geometry = new THREE.IcosahedronGeometry(1, 3);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });

  const core = new THREE.Mesh(geometry, material);
  scene.add(core);

  // Add energy field
  const ambientLight = new THREE.AmbientLight(0x00ffff, 0.5);
  scene.add(ambientLight);

  camera.position.z = 2;

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    core.rotation.x += 0.005;
    core.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
};

// System Uptime Counter
const startUptime = () => {
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('uptime').textContent = `${hrs}:${mins}:${secs}`;
  }, 1000);
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initHologram();
  startUptime();
  document.getElementById('year').textContent = new Date().getFullYear();

  // Cyberpunk mode toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('cyberpunk-mode');
  });
});