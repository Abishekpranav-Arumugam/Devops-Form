pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "abishekpranav/bill-calculator"
        DOCKER_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker"   // Set Docker Hub credentials in Jenkins
        GITHUB_CREDENTIALS_ID = "github_seccred"
        KUBECONFIG = "/var/lib/jenkins/.kube/config"  // Path to Kubernetes config
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: GITHUB_CREDENTIALS_ID, url: 'https://github.com/your-github-repo.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: DOCKER_CREDENTIALS_ID, url: 'https://index.docker.io/v1/']) {
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "kubectl apply -f deployment.yml"
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    sh "kubectl get pods"
                    sh "kubectl get svc"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
