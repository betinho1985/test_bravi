class KnightMoves {
    constructor(initial_move) {
      this.initial_move = initial_move;
    }

    get moves() {
        return this.calcMoves()
    }

    calcMoves() {
        fetch('http://localhost:8080/gateway/',{
        method: 'get',
        body: JSON.stringify(position)
        }).then(response => response.json())
          .then(result => {
            console.log(result);
          })
          .catch(err => {
          console.error('Failed retrieving information', err);
        });
    }
}
