workflow "New workflow" {
  on = "push"
  resolves = ["action.yml"]
}

action "action.yml" {
  uses = ".github/action.yml"
}
