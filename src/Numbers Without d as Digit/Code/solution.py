class Solution:

    def countWithout(self, n: int, d: int) -> int:
        # I convert n to a string so I can process its digits from left to right.
        s = str(n)

        # dp[tight][started] stores the number of valid ways for the processed prefix.
        # tight = 1 means the prefix is equal to n's prefix.
        # started = 1 means I have already placed a real digit.
        dp = [
            [0, 0],
            [1, 0]
        ]

        # I process every digit of n one by one.
        for current in s:
            # I create the DP table for the next position.
            next_dp = [
                [0, 0],
                [0, 0]
            ]

            # I check all possible tight and started states.
            for tight in range(2):
                for started in range(2):
                    # I skip states that have no possible numbers.
                    if dp[tight][started] == 0:
                        continue

                    # A tight state cannot choose a digit larger than n's digit.
                    # A non-tight state can choose any digit from 0 to 9.
                    limit = int(current) if tight else 9

                    # I try every possible digit for this position.
                    for digit in range(limit + 1):
                        # A leading zero does not start the number.
                        next_started = started == 1 or digit != 0

                        # I reject d only when the number has actually started.
                        # This correctly handles the special case d = 0.
                        if next_started and digit == d:
                            continue

                        # The next state is tight only when the chosen digit
                        # is exactly the current digit of n.
                        next_tight = 1 if tight and digit == limit else 0

                        # I add all ways from the current state to the next state.
                        next_dp[next_tight][int(next_started)] += dp[tight][started]

            # I continue processing with the states for the next digit.
            dp = next_dp

        # I count only states where the number has started.
        # The state where started = 0 represents number 0, so I exclude it.
        return dp[0][1] + dp[1][1]