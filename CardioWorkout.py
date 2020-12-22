import random


class CardioWorkout:
    cardio_dict = {
        1: "Walking Lunges 100 meters",
        2: "Sit-ups till failure",
        3: "Pushups 20 repetitions",
        4: "Bodyweight Squats 50 repetitions",
        5: "Sprint 100 meters",
        6: "Hill Sprints up and down twice",
        7: "High Knees 30s",
        8: "Squat Jumps till failure",
        9: "Pistol Squats till failure",
        10: "Plank 2 minutes",
        11: "1000 meter swim",
        12: "Diamond Pushups 20 repetitions",
        13: "Incline Pushups 20 repetitions",
        14: "Burpees till failure",
        15: "Russian Twists 2 minutes",
        16: "Pullups till failure",
        17: "Run 1 mile",
        18: "Military crawl 25meters",
        19: "WideGrip Pullups till failure"
    }

    def __init__(self, difficulty):
        self.difficulty = difficulty
        self.exercise = self.get_exercise()
        self.exercise_two = self.get_exercise()
        self.exercise_three = self.get_exercise()
        self.circuit_sets = self.get_circuit()
        self.check_uniq()

    def get_exercise(self):
        x = random.randint(1, 19)
        return self.cardio_dict[x]

    def get_circuit(self):
        if self.difficulty == 'hard':
            y = random.randint(3, 4)
        elif self.difficulty == 'medium':
            y = random.randint(2, 3)
        else:
            y = random.randint(1, 2)
        return y

    def check_uniq(self):
        if self.exercise == self.exercise_two:
            self.exercise = self.get_exercise()
            self.check_uniq()
        elif self.exercise == self.exercise_three:
            self.exercise = self.get_exercise()
            self.check_uniq()
        elif self.exercise_two == self.exercise_three:
            self.exercise_two = self.get_exercise()
            self.check_uniq()
        else:
            return None

    def make_dict(self):
        mega_dict = {"Exercise_One": self.exercise,
                     "Exercise_Two": self.exercise_two,
                     "Exercise_Three": self.exercise_three,
                     "Circuit_sets": self.circuit_sets
                     }
        return mega_dict
