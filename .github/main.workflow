workflow "New workflow" {
  on = "push"
  resolves = ["action.yml"]
}

action "action.yml" {
  uses = "./action.yml"
}
