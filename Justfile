# The following variables are used to configure the container runtime
container_runtime := "podman"
container_build := "buildah"
container_compose := "docker-compose"

compose_infratructure_args := "-f container/infrastructure-compose.yaml --env-file " + justfile_directory() + "/.env" 

compose_infratructure:
    {{ container_compose }} {{ compose_infratructure_args }} up -d

compose_infratructure_down:
    {{ container_compose }} {{ compose_infratructure_args }} down
   