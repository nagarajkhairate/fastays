pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GITHUB_CREDENTIALS = credentials('github-credentials')
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/nagarajkhairate/fastays.git'
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    def frontendImage = docker.build('my-frontend', './frontend')
                }
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    def backendImage = docker.build('my-backend', './backend')
                }
            }
        }
        stage('Push Frontend') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        def frontendImage = docker.image('my-frontend')
                        frontendImage.push('latest')
                    }
                }
            }
        }
        stage('Push Backend') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        def backendImage = docker.image('my-backend')
                        backendImage.push('latest')
                    }
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                script {
                    sh 'kubectl apply -f frontend-deployment.yaml'
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                script {
                    sh 'kubectl apply -f backend-deployment.yaml'
                }
            }
        }
    }
}
