import random


class StrengthWorkouts:
    strength_dict = {
        1: "Front Squat",
        2: "OverHeadPress",
        3: "Deadlift",
        4: "Squat",
        5: "Romainian Deadlift",
        6: "BenchPress",
        7: "Stiff Leg Deadlift",
        8: "Incline BenchPress",
        9: "Decline BenchPress",
        10: "Seated OverHeadPress",
        11: "Barbell row",
        12: "Pendlay row",
        13: "Dumbbell Bench press",
        14: "Dumbbell Incline Bench press",
        15: "Dumbbell seated overheadPress",
        16: "Dumbbell row",
        17: "Good Mornings",
        18: "WideGrip Pushups",
        19: "Bulgarian Split Squats",
        20: "WideGrip Pullups",
        21: "Pullups",
        22: "Hip Thrust"
    }

    def __init__(self, difficulty):
        self.difficulty = difficulty
        self.exercise = self.get_randexercise()
        self.sets = self.get_randsets()
        self.reps = self.get_randreps()
        self.rest_time = self.get_randtime()
        self.weight = self.get_weight()

    def get_randexercise(self):
        x = random.randint(1, 22)
        return self.strength_dict[x]

    def get_randsets(self):
        if self.difficulty == 'hard':
            y = random.randint(4, 5)
        elif self.difficulty == 'medium':
            y = random.randint(3, 4)
        else:
            y = random.randint(1, 3)
        return y

    def get_randreps(self):
        if self.difficulty == 'hard':
            z = random.randint(10, 15)
        elif self.difficulty == 'medium':
            z = random.randint(8, 10)
        else:
            z = random.randint(5, 8)
        return z

    def get_randtime(self):
        a = self.sets * random.randint(2, 5)
        a = str(a) + " minutes"
        return a

    def get_weight(self):
        if self.difficulty == 'hard':
            b = '0.85 X 1RM'
        elif self.difficulty == 'medium':
            b = '0.7 X 1RM'
        else:
            b = '0.5 X 1RM'
        return b

    def make_dict(self):
        workout_dict = {"Exercise": self.exercise,
                        "Weight": self.weight,
                        "Sets": self.sets,
                        "Reps": self.reps,
                        "Rest_time": self.rest_time}
        return workout_dict


if __name__ == '__main__':
    workout = StrengthWorkouts('hard')
    sentence = workout.exercise + ' at ' + workout.weight + ' for ' + str(workout.sets) + 'sets by ' + str(workout.reps) + 'reps this should take at most ' + workout.rest_time
    print(sentence)
