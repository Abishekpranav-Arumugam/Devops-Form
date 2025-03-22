pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "abishekpranav/bill-calculator"
        DOCKER_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker"
        GITHUB_CREDENTIALS_ID = "github_seccred"
        KUBECONFIG = '/home/abishekpranav/.kube/config'  // Ensure correct Minikube context
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: GITHUB_CREDENTIALS_ID, url: 'https://github.com/Abishekpranav-Arumugam/Devops-Form', branch: 'main'
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
                withDockerRegistry([credentialsId: DOCKER_CREDENTIALS_ID, url: '']) {
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl config use-context minikube' // Ensure Minikube context
                    sh 'kubectl apply -f bill-deployment.yml --validate=false'
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
