# Blackjack

An implementation of the classic game Blackjack in React/Redux. Whilst it can be built simply in straight HTML/JS, redux lends itself really nicely to game loops by updating its state based on user actions, of which black jack has three main ones (new game, hit, stick) and keeping everything clean. From there we get down and dirty with some functional practices in working out the current and best scores (handling both high and low aces to get as close to 21 as possible) with just a hint of OOP in handling the deck of cards.

The UI is fairly bare bones and will need future work (e.g. actually having proper playing cards).

## Testing

Both of the major utility modules have strong test coverage. Blackjack reducer has limited coverage due to time constrains unfortunately, but notes have been left about future development in that area.

## Further Development

 - Handle natural 21's at start of game
 - Update UI
 - Complete test coverage
 - More advanced edge cases of the game

## Building

Obligatory
```
$ npm install
```

### Dev
Requires two console tabs. In first tab:
```
$ npm run start
```
In second tab:
```
$ npm run Dev
```
Navigate to `localhost:8080`. Webpack will rebuild changes live via hot reload

### Prod
For production bundle build
```
$ npm run build && npm run start
```
Bundled file output in `/dist`. Navigate to `localhost:4060` or alternately copy `view/index.html` to `/dist` and open `index.html`
