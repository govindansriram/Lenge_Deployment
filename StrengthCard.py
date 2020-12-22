from StrengthWorkouts import StrengthWorkouts


class StrengthCard:
    def __init__(self, difficulty):
        self.difficulty = difficulty
        self.exercise_one = StrengthWorkouts(self.difficulty)
        self.exercise_two = StrengthWorkouts(self.difficulty)
        self.exercise_three = StrengthWorkouts(self.difficulty)
        self.check_uni()
        self.exercise_one = self.exercise_one.make_dict()
        self.exercise_two = self.exercise_two.make_dict()
        self.exercise_three = self.exercise_three.make_dict()

    def check_uni(self):
        if self.exercise_one.exercise == self.exercise_two.exercise:
            self.exercise_one = StrengthWorkouts(self.difficulty)
            self.check_uni()
        elif self.exercise_one.exercise == self.exercise_three.exercise:
            self.exercise_one = StrengthWorkouts(self.difficulty)
            self.check_uni()
        elif self.exercise_two.exercise == self.exercise_three.exercise:
            self.exercise_two = StrengthWorkouts(self.difficulty)
            self.check_uni()
        else:
            return None

    def make_megadict(self):
        mega_dict = {"Exercise_One": self.exercise_one,
                     "Exercise_Two": self.exercise_two,
                     "Exercise_Three": self.exercise_three
                     }
        return mega_dict
