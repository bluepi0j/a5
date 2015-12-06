from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()

    def login(self):
        self.client.post("/login", {"username":"test", "password":"1234567890qQ!"})

    @task(2)
    def index(self):
        self.client.get("/")

    @task(1)
    def profile(self):
        self.client.get("/api/users/me")
    @task(1)
    def recommend(self):
        self.client.get("/api/sketchpad/recommend/interest")
    @task(1)
    def rating(self):
        self.client.get("/api/sketchpad/recommend/rating") 
    @task(1)
    def rated(self):
        self.client.get("/api/sketchpad/recommend/ratedtimes") 
    @task(1)
    def rated(self):
        self.client.get("/api/sketchpad/showall") 
    

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=5000
    max_wait=9000