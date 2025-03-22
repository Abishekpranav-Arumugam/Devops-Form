pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "abishekpranav/bill-calculator"
        DOCKER_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "dockerhub_credentials"
        GITHUB_CREDENTIALS_ID = "github_seccred"
        KUBECONFIG = "/home/abishekpranav/.kube/config"  // Ensure correct Minikube context
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: GITHUB_CREDENTIALS_ID, url: 'https://github.com/Abishekpranav-Arumugam/Devops-Form'
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
                script {
                    withDockerRegistry([credentialsId: DOCKER_CREDENTIALS_ID, url: "https://index.docker.io/v1/"]) {
                        sh "docker login -u \$DOCKER_USERNAME -p \$DOCKER_PASSWORD"
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh '''
                    export KUBECONFIG=/home/abishekpranav/.kube/config
                    kubectl config use-context minikube
                    kubectl apply -f bill-deployment.yml --validate=false
                    '''
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
