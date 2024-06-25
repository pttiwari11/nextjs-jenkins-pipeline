pipeline {
    agent any

    tools {
        nodejs "NodeJS 22"
    }

    environment {
        YARN_VERSION = '1.22.21'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/pttiwari11/nextjs-jenkins-pipeline.git'
            }
        }

        stage('Install Yarn') {
            steps {
                sh 'npm install -g yarn@${YARN_VERSION}'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install'
            }
        }

        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }

        // stage('Test') {
        //     steps {
        //         sh 'yarn test'
        //     }
        // }

        stage('Deploy') {
            steps {
                echo 'Deploying to production...'
                // Add your deployment steps here
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/build/**'
            junit 'reports/**/*.xml'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
