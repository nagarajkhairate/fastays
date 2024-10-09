pipeline {
    agent any
    environment {
        GITHUB_CREDENTIALS = credentials('github-credentials')
        DOCKERHUB_USERNAME = nagarajkhairate
        DOCKERHUB_PASSWORD = 8497049nN@
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: 'GITHUB_CREDENTIALS', url: 'https://github.com/nagarajkhairate/fastays.git'
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
                    sh "echo ${env.DOCKERHUB_PASSWORD} | docker login -u ${env.DOCKERHUB_USERNAME} --password-stdin"
                    def frontendImage = docker.image('my-frontend')
                    frontendImage.push('latest')
                }
            }
        }
        stage('Push Backend') {
            steps {
                script {
                    sh "echo ${env.DOCKERHUB_PASSWORD} | docker login -u ${env.DOCKERHUB_USERNAME} --password-stdin"
                    def backendImage = docker.image('my-backend')
                    backendImage.push('latest')
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
