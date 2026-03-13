pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        APP_PORT = '3000'
    }

    triggers {
        // Trigger build on push to GitHub
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                bat 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                echo '🔨 Building application...'
                bat 'echo Build complete - No build step required for this project'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                bat 'npm test'
            }
        }

        stage('Deploy Application') {
            steps {
                echo '🚀 Deploying application...'
                bat '''
                    echo Stopping existing server if running...
                    taskkill /F /IM node.exe 2>nul || echo No existing server to stop
                    echo Starting application server...
                    start /B node backend/server.js
                    echo ✅ Application deployed successfully on port %APP_PORT%
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo '🌐 Application is running at http://localhost:3000'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs for details.'
        }
        always {
            echo '📋 Pipeline execution finished.'
        }
    }
}
