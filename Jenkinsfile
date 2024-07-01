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

        // stage('Install Yarn') {
        //     steps {
        //         sh 'npm install -g yarn@${YARN_VERSION}'
        //     }
        // }

        stage('Install Dependencies') {
            steps {
                sh 'npm install -g yarn@${YARN_VERSION}'
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

        stage('Restart Application Locally') {
            steps {

                sh """
                    # Check if pm2 is installed, if not, install it
                        if ! command -v pm2 &> /dev/null
                        then
                            echo "pm2 not found. Installing..."
                            npm install -g pm2
                            pm2 start yarn --name "nextjs-jenkins-pipeline" -- start
                        else
                            echo "pm2 is already installed."
                            pm2 restart nextjs-jenkins-pipeline
                        fi

                    """


                script {
                    // Check if PM2 is managing the application
                    def pm2List = sh(script: 'pm2 list', returnStdout: true)
                    if (pm2List.contains('nextjs-jenkins-pipeline')) {
                        // Restart the application if it is already managed by PM2
                        sh 'pm2 restart nextjs-jenkins-pipeline'
                    } else {
                        // Start the application if it is not yet managed by PM2
                        sh 'pm2 start yarn --name nextjs-jenkins-pipeline -- start'
                    }
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo 'Deploying to production...'
                // Add your deployment steps here
                echo 'Triggering Vercel Deployment...'
                withCredentials([string(credentialsId: 'vercel-deploy-hook', variable: 'VERCEL_DEPLOY_HOOK')]) {
                    sh 'curl -X POST ${VERCEL_DEPLOY_HOOK}'
                }
            }
        }
    }

    post {
        // always {
        //     archiveArtifacts artifacts: '**/build/**'
        //     junit 'reports/**/*.xml'
        // }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
