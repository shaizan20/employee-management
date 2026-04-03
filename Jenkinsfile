pipeline {
    agent any

    environment {
        IMAGE_NAME = 'employee-management-system'
        COMPOSE_FILE = 'docker-compose.yml'
    }

    triggers {
        // Poll SCM every 2 minutes for changes
        pollSCM('H/2 * * * *')
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
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh "docker build -t ${IMAGE_NAME}:latest ."
                echo '✅ Docker image built successfully'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo '🚀 Deploying application with Docker Compose...'
                sh '''
                    echo Stopping existing containers...
                    docker-compose down --remove-orphans 2>/dev/null || echo No existing containers to stop
                    echo Starting application stack...
                    docker-compose up -d --build
                    echo ✅ Application stack deployed successfully
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo '🏥 Running health check...'
                sh '''
                    echo Waiting for application to start...
                    sleep 15
                    curl -s -o /dev/null -w "HTTP Status: %{http_code}" http://localhost:3000/ || echo Health check warning - app may still be starting
                '''
            }
        }
    }

    post {
        success {
            echo '═══════════════════════════════════════════'
            echo '✅ Pipeline completed successfully!'
            echo '🐳 Docker containers are running'
            echo '🌐 Application: http://localhost:3000'
            echo '═══════════════════════════════════════════'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs for details.'
            sh 'docker-compose logs --tail=50 2>/dev/null || echo "Could not fetch container logs"'
        }
        always {
            echo '📋 Pipeline execution finished.'
        }
    }
}
