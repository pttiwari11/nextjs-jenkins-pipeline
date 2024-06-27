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

        stage('Install Yarn on Jenkins') {
            steps {
                // Check if yarn is installed on Jenkins agent, if not, install it
                sh '''
                if ! command -v yarn &> /dev/null
                then
                    echo "Yarn not found. Installing..."
                    npm install -g yarn@${YARN_VERSION}
                else
                    echo "Yarn is already installed."
                fi
                '''
            }
        }

        stage('Install Dependencies on Jenkins') {
            steps {
                // sh 'yarn install'
                echo "Dependencies Installed Successfully."
            }
        }

        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to local Ubuntu server...'
                
                // Using the secret credentials
                withCredentials([
                    string(credentialsId: 'SERVER_USER', variable: 'SERVER_USER'),
                    string(credentialsId: 'SERVER_HOST', variable: 'SERVER_HOST'),
                    string(credentialsId: 'SERVER_DEPLOY_PATH', variable: 'SERVER_DEPLOY_PATH'),
                    sshUserPrivateKey(credentialsId: 'server-ssh-credentials-id', keyFileVariable: 'server-ssh-credentials-id')
                ]) 
                // {

                //     // Ensure .ssh directory exists
                //     // Add the SSH host key to the known_hosts file
                //     sh """
                //     mkdir -p ~/.ssh
                //     ssh-keyscan -H ${SERVER_HOST} >> ~/.ssh/known_hosts
                //     """

                //     // Copy built files to the server
                //     sh """
                //     rsync -avz --delete -e "ssh -i ${server-ssh-credentials-id}" ./ ${SERVER_USER}@${SERVER_HOST}:${SERVER_DEPLOY_PATH}
                //     """

                //     // SSH into the server to check and install dependencies, and start the application
                //     sshagent(['server-ssh-credentials-id']) { // Replace this with your actual SSH credentials ID
                //         sh """
                //         ssh -i ${server-ssh-credentials-id} ${SERVER_USER}@${SERVER_HOST} '
                //         # Check if Node.js is installed, if not, install it
                //         if ! command -v node &> /dev/null
                //         then
                //             echo "Node.js not found. Installing..."
                //             curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
                //             sudo apt-get install -y nodejs
                //         else
                //             echo "Node.js is already installed."
                //         fi
                        
                //         # Check if npm is installed, if not, install it
                //         if ! command -v npm &> /dev/null
                //         then
                //             echo "npm not found. Installing..."
                //             sudo apt-get install -y npm
                //         else
                //             echo "npm is already installed."
                //         fi
                        
                //         # Check if yarn is installed, if not, install it
                //         if ! command -v yarn &> /dev/null
                //         then
                //             echo "Yarn not found. Installing..."
                //             npm install -g yarn@${YARN_VERSION}
                //         else
                //             echo "Yarn is already installed."
                //         fi

                //         # Check if pm2 is installed, if not, install it
                //         if ! command -v pm2 &> /dev/null
                //         then
                //             echo "pm2 not found. Installing..."
                //             sudo npm install -g pm2
                //         else
                //             echo "pm2 is already installed."
                //         fi

                //         # Navigate to the project directory, install dependencies and restart the application
                //         cd ${SERVER_DEPLOY_PATH}
                //         yarn install
                //         pm2 stop all
                //         pm2 start yarn --name "nextjs-jenkins-pipeline" -- start
                //         '
                //         """
                //     }
                // }

                {
                    sh """
                    mkdir -p ${SERVER_DEPLOY_PATH}
                    rm -rf ${SERVER_DEPLOY_PATH}/*
                    cp -r .next static package.json yarn.lock ${SERVER_DEPLOY_PATH}
                    echo ${SERVER_DEPLOY_PATH}
                    cd ${SERVER_DEPLOY_PATH} && yarn install --production

                    # Check if pm2 is installed, if not, install it
                        if ! command -v pm2 &> /dev/null
                        then
                            echo "pm2 not found. Installing..."
                            sudo npm install -g pm2
                        else
                            echo "pm2 is already installed."
                        fi
                        
                    pm2 stop all
                    pm2 start yarn --name "nextjs-jenkins-pipeline" -- start
                    """
                }

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
