# 🚀 CollabCode

## 📌 Overview  
**CollabCode** is a lightweight real-time code collaboration platform that allows multiple users to join a shared session and edit code simultaneously. Users simply enter a username and start collaborating instantly — no complex setup required.

The project demonstrates real-time communication along with modern DevOps practices using containerization and cloud deployment.

---

## 🌐 Live Demo  
🔗 **Try it here:**  
http://docker-collabcode-aws-alb-203134975.eu-north-1.elb.amazonaws.com/

---

## ⚙️ Features  
- 👥 Join with a username  
- 🧑‍💻 Real-time collaborative code editing  
- 🔄 Live updates across all connected users  
- ⚡ Simple and minimal UI  
- 🐳 Dockerized application  
- ☁️ Deployed on AWS (ECS + ECR + ALB)

---

## 🧑‍💻 How to Use (Online)  
1. Open the live link above  
2. Enter your **username**  
3. Join the session  
4. Start coding collaboratively in real-time  

---

## 🛠️ Tech Stack  
- Frontend: React / JavaScript  
- Backend: Node.js / Express  
- Real-time: Socket.IO / WebSockets  
- Containerization: Docker  
- Cloud: AWS ECS, ECR, Application Load Balancer  

---

## 🏃‍♂️ Run Locally  

### 1. Clone the Repository  
bash
git clone https://github.com/your-username/collabcode.git
cd collabcode

### 2. Run with Docker  
Make sure Docker is installed and running.

docker build -t collabcode .
docker run -p 3000:3000 collabcode

### 3. open is browser 
http://localhost:3000

## 📦 Deployment  
- Docker image pushed to **AWS ECR**  
- Services managed using **AWS ECS**  
- Traffic handled via **Application Load Balancer (ALB)**  

---
a
## 📌 Future Improvements  
- Authentication system  
- Multiple rooms support  
- Code language selection  
- File sharing  

---

## 🤝 Contributing  
Feel free to fork the repo and submit pull requests!
