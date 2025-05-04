# 🧠 NeuroMark — AI-Powered Facial Recognition Attendance System

NeuroMark is an enterprise-grade, AI-driven attendance tracking solution that processes up to **20 RTSP camera streams simultaneously**. It automatically detects and identifies registered users, logs attendance according to customizable rules, and provides real-time monitoring and analytics via web and mobile interfaces—all while maintaining stringent security and privacy compliance.

---

## Executive Summary
NeuroMark leverages modern computer-vision models, distributed microservices, and secure cloud infrastructure to deliver a **scalable**, **reliable**, and **accurate** facial-recognition attendance system. It supports:
- **20 concurrent RTSP camera feeds**  
- **High-accuracy detection** under varying lighting  
- **Automated check-in/out** with business-rule customization  
- **Real-time dashboards**, analytics, and reporting  
- **Web & mobile** user interfaces  
- **Enterprise-grade** security and privacy compliance  

---

## Key Features
- 🎥 **Live RTSP Integration** — ingest and preprocess 20 camera streams  
- 🧠 **Multi-stage Face Detection & Recognition** — MTCNN/RetinaFace + FaceNet/ArcFace embeddings  
- 🔄 **Distributed Processing** — Kafka-backed, horizontally scalable pipeline  
- 📊 **Reporting & Analytics** — real-time and historical dashboards, CSV/Excel/PDF export  
- 🌐 **Web Admin Dashboard** — user, camera, rule management; live monitoring; notifications  
- 📱 **Mobile App** — GPS/QR-backed check-in, offline mode, push alerts  
- 🔒 **Security & Compliance** — JWT/OAuth2.0/MFA, GDPR/CCPA–ready, encrypted biometrics  

---

## System Architecture
1. **Video Ingestion Service**  
   - Manages RTSP connections, health checks, frame preprocessing  
2. **Face Detection & Recognition Engine**  
   - Multi-face detection → landmark alignment → embedding extraction → vector DB lookup  
3. **Attendance Processing Service**  
   - Applies rules (grace periods, shifts), logs check-ins/outs, handles exceptions  
4. **API Gateway**  
   - Unified REST interface, authn/authz, rate limiting, OpenAPI docs  
5. **Data Storage**  
   - PostgreSQL (users, attendance, audit logs)  
   - Vector DB (Milvus/Pinecone/Weaviate) for 512-dim embeddings  
   - Object storage (S3-compatible) for images/videos  
6. **Frontend Apps**  
   - React/Next.js admin dashboard  
   - PWA or React/Vue user portal  
   - Flutter/React Native mobile client  
7. **Notification Service**  
   - Email/SMS/push alerts, report delivery  

---

## Hardware & Network Requirements
### Cameras
- 1080p @ 15–30 fps, H.264/H.265, PoE, WDR, IP66 (outdoor)
- ≥ 5 Mbps upload per camera

### Servers
- **Video Processing**: 2× nodes (16 cores, 64 GB RAM, ≥ NVIDIA T4 GPU, 1 TB NVMe, 10 GbE)
- **App & DB**: 8 cores, 32 GB RAM, ≥ 2 TB NVMe RAID, 10 GbE
- **Backup/Storage**: 20 TB redundant, 8 cores, 32 GB RAM, 10 GbE

### Network
- 10 GbE backbone; redundant 100 Mbps Internet; enterprise firewall + IDS/IPS; VPN for maintenance

---

## Tech Stack
| Layer                      | Technology                                  |
|----------------------------|---------------------------------------------|
| Video Ingestion & Pipeline | FFmpeg, GStreamer, OpenCV, Apache Kafka     |
| Face Detection/Recognition | MTCNN/RetinaFace, Haar Cascades, FaceNet/ArcFace, Dlib |
| Backend                    | Python (FastAPI), Node.js, Docker, Kubernetes |
| API & Auth                 | JWT, OAuth 2.0, OpenAPI/Swagger             |
| Database                   | PostgreSQL,MongoDB Milvus/Pinecone/Weaviate, S3-compatible |
| Web Frontend               | React.js/Next.js, Material-UI/Ant Design, D3.js/Chart.js |
| Mobile                     | Flutter or React Native, SQLite, FCM        |
| Infra as Code              | Terraform, Helm, Ansible                    |

---

## Installation & Deployment
1. **Clone repo**  
   ```bash
   git clone https://github.com/saymi313/NeuroMark.git 
