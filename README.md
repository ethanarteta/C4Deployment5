# Terraform VPC Deployment Documentation

## Purpose
This documentation provides an overview of deploying a Banking Application using Terraform. The goal is to create a Terraform file with specific components and set up Jenkins for continuous integration, enabling the deployment of an application across multiple EC2 instances.

## Issues
After Step 5 I experienced issues with permissions when deploying the application on Jenkins. 
"/var/lib/jenkins/workspace/Deployment_5_main@tmp/durable-e3767fa8/script.sh: line 3: /home/ubuntu/setup.sh: Permission denied" 
To resolve this error code, I had to add permissions to execute the script as I ssh into the second instance. 
```bash 
"ssh ubuntu@3.90.115.246 'chmod +x /home/ubuntu/setup.sh && /home/ubuntu/setup.sh'"
```
## Steps

### Step 1: Terraform Creation
1. Terraform was used to create an instance along with its Infrastructure with the specified components.
This deployment needs:
- 1 Virtual Private Cloud
- 2 Availability Zones
- 2 Public Subnets
- 2 EC2 Instances
- 1 Route Table
- Security Group Ports: 8080, 8000, 22
  During this stage, I implemented a Deploy.sh script in the User Data prompt. That script installed Jenkins and its dependencies.
   
### Step 2: EC2 Instance Setup
**For the first EC2 instance (Instance 1):**
1. Once Jenkins is installed.
2. Create a Jenkins user password and log into the Jenkins user.
3. Generate an SSH key pair on this instance using `ssh-keygen`.
4. Copy the public key contents.
5. Install dependenancies
- Install `software-properties-common`:
- sudo apt install -y software-properties-common
- Add the `deadsnakes` repository for Python 3.7:
- sudo add-apt-repository -y ppa:deadsnakes/ppa
- Install Python 3.7:
- sudo apt install -y python3.7
- Set up a Python 3.7 virtual environment:
- sudo apt install -y python3.7-venv

**For the second EC2 instance (Instance 2):**
1. Install the following software: `sudo apt install -y software-properties-common`, `sudo add-apt-repository -y ppa:deadsnakes/ppa`, `sudo apt install -y python3.7`, `sudo apt install -y python3.7-venv`.

### Step 3: SSH Key Exchange
1. Paste the public key from Instance 1 into the `authorized_keys` file on Instance 2.
2. Test the SSH connection between the two instances to ensure it's working correctly.

### Step 4: Jenkinsfile Configuration
In Jenkinsfilev1 and Jenkinsfilev2, I created a command to SSH into Instance 2 that will download and run the required script for that step in the Jenkinsfile. These are the bash commands I used on JenkinsfileV1 and JenkinsfileV2 respectively.
```bash
stage ('Deploy') {
steps {
sh '''#!/bin/bash
scp -p /var/lib/jenkins/workspace/Deployment_5_main/setup.sh ubuntu@3.90.115.246:/home/ubuntu/

ssh ubuntu@3.90.115.246 'chmod +x /home/ubuntu/setup.sh && /home/ubuntu/setup.sh'

```
```bash
stage('Clean') {
            steps {
                sh '''#!/bin/bash
                    scp -p /var/lib/jenkins/workspace/Deployment_5_main/pkill.sh ubuntu@3.90.115.246:/home/ubuntu/
                    ssh ubuntu@3.90.115.246 'chmod +x /home/ubuntu/pkill.sh && /home/ubuntu/pkill.sh'
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''#!/bin/bash
                    scp /var/lib/jenkins/workspace/Deployment_5_main/setup2.sh ubuntu@3.90.115.246:/home/ubuntu
                    ssh ubuntu@3.90.115.246 'chmod +x /home/ubuntu/setup2.sh && /home/ubuntu/setup2.sh'
                '''
```
### Step 5: Jenkins Multibranch Pipeline
1. Create a Jenkins multibranch pipeline.
2. Run the Jenkinsfilev1.

### Step 6: Application Testing
1. Check the application on Instance 2.
2. Observed it running on port 8000

### Step 7: Jenkinsfilev2 Execution
- Made changes to the HTML home page.
- Run Jenkinsfilev2.
- Observed changes made to the HTML home page.

#### Decision to Run Jenkinsfilev2
- I changed the configuration settings on the multibranch pipeline to run on the JenkinsfilesV2 path. 

### System Diagram


### Optimization
To make this deployment more efficient, I would implement the following:

1. **Use Terraform Modules:** Break down the Terraform configuration into reusable modules for VPC components, security groups, and EC2 instances to improve code maintainability.

2. **Implement Autoscaling:** Set up auto-scaling groups for EC2 instances to automatically adjust the number of instances based on traffic demands.

3. **Containerization:** Consider containerizing your application using Docker and deploy it on an orchestration platform like Kubernetes for more efficient management and scalability.

