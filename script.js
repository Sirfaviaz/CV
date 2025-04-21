// script.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x000000, 5, 15);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0x00ffff, 2, 100);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x00ffff, 0.4));

const ringGeo = new THREE.RingGeometry(1.5, 1.6, 64);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI / 2;
ring.position.y = -2;
scene.add(ring);

const ringGlowMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, opacity: 0.3, transparent: true });
const innerGlow = new THREE.Mesh(new THREE.RingGeometry(1.3, 1.8, 64), ringGlowMat);
innerGlow.rotation.x = Math.PI / 2;
innerGlow.position.y = -2;
scene.add(innerGlow);

const pointsGeo = new THREE.BufferGeometry();
const count = 500;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}
pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const pointsMat = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05 });
const points = new THREE.Points(pointsGeo, pointsMat);
scene.add(points);

const orbiters = [];
const skillLabels = ['JS', 'Python', 'Django', 'React', 'Tailwind'];
for (let i = 0; i < 5; i++) {
  const textCanvas = document.createElement('canvas');
  textCanvas.width = 128;
  textCanvas.height = 64;
  const ctx = textCanvas.getContext('2d');
  ctx.fillStyle = '#00ffff';
  ctx.font = '18px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#00ffff';
  ctx.shadowBlur = 6;
  ctx.fillText(skillLabels[i], 64, 32);

  const textTexture = new THREE.CanvasTexture(textCanvas);
  const planeGeo = new THREE.PlaneGeometry(1, 0.4);
  const planeMat = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true });
  const orb = new THREE.Mesh(planeGeo, planeMat);
  orb.userData = {
    radius: 2.2,
    angle: i * (Math.PI * 2 / 5),
    speed: 0.01 + i * 0.001
  };
  orbiters.push(orb);
  scene.add(orb);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;

function animate() {
  requestAnimationFrame(animate);
  orbiters.forEach((orb) => {
    orb.userData.angle += orb.userData.speed;
    orb.position.x = Math.cos(orb.userData.angle) * orb.userData.radius;
    orb.position.z = Math.sin(orb.userData.angle) * orb.userData.radius;
  });
  points.rotation.y += 0.0015;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const musicToggle = document.getElementById('muteBtn');
const ambient = document.getElementById('ambientSound');
let isMuted = false;
musicToggle.addEventListener('click', () => {
  isMuted = !isMuted;
  ambient.muted = isMuted;
  musicToggle.textContent = isMuted ? '🔇 Unmute' : '🔊 Mute';
});

// Text typing logic
function typeText(text, target) {
  let idx = 0;
  target.textContent = '';
  const interval = setInterval(() => {
    target.textContent += text[idx++];
    if (idx >= text.length) clearInterval(interval);
  }, 20);
}

const skillsTab = document.getElementById('skillsTab');
const skillsModal = document.getElementById('skillsModal');
const experienceTab = document.getElementById('experienceTab');
const experienceModal = document.getElementById('experienceModal');
const educationTab = document.getElementById('educationTab');
const educationModal = document.getElementById('educationModal');
const contactTab = document.getElementById('contactTab');
const contactModal = document.getElementById('contactModal');

skillsTab.onclick = () => {
  skillsModal.style.display = 'flex';
  typeText(`Skills:
- Office Administration
- Procurement & Vendor Management
- HR & Payroll Assistance
- Financial & Accounts Support
- ERPNext (Accounts, Stock)
- Product Listing Automation
- Basic Hardware & Networking
- Python, Django, HTML, CSS, JavaScript
- React, Tailwind CSS
- Firebase, Git & GitHub
- Microsoft Office Suite`, document.getElementById('typing'));
};

experienceTab.onclick = () => {
  experienceModal.style.display = 'flex';
  typeText(`Experience:

Sales & Online Operations Manager
Confidential Electronics Supplier – Qatar (Dec 2024 – Present)
- Managed online sales via Snoonu & Rafeeq
- Handled listings, pricing, orders & logistics
- Implemented ERPNext for stock/accounts
- Automated product listings & backups

Sales Coordinator
Marhaba Traders – India (Mar 2020 – Nov 2024)
- Processed orders, supplier coordination
- Financial documentation & customer support

Administrator
Marconi Metal Industries LLC – Dubai (Jan 2017 – Dec 2019)
- Managed admin tasks & HR coordination
- Implemented centralized data backup
- Handled IT & hardware troubleshooting

Management Trainee
Marhaba Traders – India (Mar 2015 – Jun 2016)
- Sales & fund collection records
- Weekly/monthly reporting

Sales & Marketing Executive
Marhaba Traders – India (May 2013 – Jan 2015)
- Client meetings & trend reporting`, document.getElementById('typingExp'));
};

educationTab.onclick = () => {
  educationModal.style.display = 'flex';
  typeText(`Education:
- Bachelor of Business Administration (BBA)
  Bharathiar University, Coimbatore (2012–2016)
- Higher Secondary (CBSE – 2011–2012)
- Secondary School (CBSE – 2001–2011)

Certifications:
- MS Office – G-TEC, Kerala
- Web Development (Self-learned)
- ERPNext Integration
- Hardware & Networking (Basic)`, document.getElementById('typingEdu'));
};

contactTab.onclick = () => {
  contactModal.style.display = 'flex';
  typeText(`Contact:
- Name: Mohammed Favaz VP
- Email: favazmohammed.vp@gmail.com
- Phone: +974 7168 1612
- Location: Qatar
- Portfolio: https://cv.fvzmhd.pro
- Nationality: Indian
- Date of Birth: 25-01-1994
- Marital Status: Single
- Driving License: Valid (Qatar)`, document.getElementById('typingContact'));
};
