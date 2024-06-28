pipeline {
    agent any

    tools {
        nodejs "NodeJS 22"
    }

    environment {
        YARN_VERSION = '1.22.21'
        DEPLOY_PATH = '/Desktop/testing/server/nextjs-jenkins-pipeline'
    }

    stages {

        stage('Deploy Application') {
            steps {
                script {
                    // Ensure the deployment directory exists
                    // sh "mkdir -p ${DEPLOY_PATH}"

                    // Remove existing files in the deployment directory
                    // sh "rm -rf ${DEPLOY_PATH}/*"

                    // Copy all files to the deployment directory
                    // sh "cp -r . ${DEPLOY_PATH}"

                    // list all files on jenkins repo path
                    sh "ls"

                    // Change to the deployment directory
                    dir("${DEPLOY_PATH}") {
                        // Install production dependencies
                        // sh 'yarn install --production'

                        // list all files on deploy repo path
                        sh "ls"
                    }
                }
            }
        }

        stage('Restart Application') {
            steps {
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
