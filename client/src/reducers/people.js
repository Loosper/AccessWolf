const mockPeople = [
  {
      "id": 1,
      "name": "Steve",
      "card_id": "111",
      "groups": []
  },
  {
      "id": 2,
      "name": "Richard",
      "card_id": "222",
      "groups": [
          1
      ]
  },
  {
      "id": 3,
      "name": "Lewis",
      "card_id": "333",
      "groups": [
          1
      ]
  }
]

export default function people(state = mockPeople, action) {
  return state
}