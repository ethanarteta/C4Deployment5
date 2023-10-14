<p align="center">
<img src="https://github.com/kura-labs-org/kuralabs_deployment_1/blob/main/Kuralogo.png">
</p>

## Deployment Instructions:
1. Create a VPC with Terraform and the VPC **MUST** have only the components listed below:
    - 1 VPC
    - 2 AZ's
    - 2 Public Subnets
    - 2 EC2's
    - 1 Route Table
    - Security Group Ports: 8080, 8000, 22     
2. For the first instance follow the below instructions:
```
- Install Jenkins
- Create a Jenkins user password and log into the Jenkins user (Review Deployment 3 on how to do this)
- Create a public and private key on this instance with ssh-keygen
- Copy the public key contents and paste it into the second instance authorized_keys
- IMPORTANT: Test the ssh connection
- Exit the jenkins user
- Now, in the ubuntu user, install the following: {sudo apt install -y software-properties-common, sudo add-apt-repository -y ppa:deadsnakes/ppa, sudo apt install -y python3.7, sudo apt install -y python3.7-venv}
```
3. On the second instance, install the following:
```
- Install the following: {sudo apt install -y software-properties-common, sudo add-apt-repository -y ppa:deadsnakes/ppa, sudo apt install -y python3.7, sudo apt install -y python3.7-venv}
```
4. In the Jenkinsfilev1 and Jenkinsfilev2, create a command that will ssh into the second instance and download and run the required script for that step in the Jenkinsfile
5. Create a Jenkins multibranch pipeline and run the Jenkinsfilev1 
6. Check the application on the second instance!!
7. Now make a change to the HTML and then run the Jenkinsfilev2 
8. How did you decide to run the Jenkinsfilev2?
9. Should you place both instances in the public subnet? Or should you place them in a private subnet? Explain why?
10. Make sure you add your main.tf to your repository

