const mockEvents = {
  1: {
    id: 1,
    title: 'Math',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }],
    room: 'Mirin',
    groups: [{
      name: 'Tumor'
    }],
    individuals: [
	    { name: 'az' },
	    { name: 'ti' }
	  ],
  },
  2: {
    id: 2,
    title: 'Bel',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }],
    room: 'Pirin',
    groups: [{
      name: 'Tumor'
    }],
    individuals: [
	    { name: 'az' },
	    { name: 'ti' }
	  ],
  },
  3: {
    id: 4,
    title: 'Da',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }],
    room: 'Rodopite',
    groups: [{
      name: 'Tumor'
    }],
    individuals: [
	    { name: 'az' },
	    { name: 'ti' }
	  ],
  },
  4: {
    id: 3,
    title: 'Ne',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }],
    room: 'Rodopite',
    groups: [{
      name: 'Tumor'
    }],
    individuals: [
	    { name: 'az' },
	    { name: 'ti' }
	  ],
  },
  5: {
    id: 5,
    title: 'Da',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }],
    room: 'Rodopite',
    groups: [{
      name: 'Tumor'
    }],
    individuals: [
	    { name: 'az' },
	    { name: 'ti' }
	  ],
  },
  6: {
    id: 6,
    title: 'Ne',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }],
    room: 'Rodopite',
    groups: [{
      name: 'Tumor'
    }],
    individuals: [
	    { name: 'az' },
	    { name: 'ti' }
	  ],
  }
}

mockEvents[1].start.setDate(6)
mockEvents[3].start.setDate(6)

export default function events(state = mockEvents, action) {
  return state
}