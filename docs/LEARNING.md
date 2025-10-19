
# Learning Cheats & Quick Reference

![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white) ![TS](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=flat-square&logo=c%2B%2B&logoColor=white)

A compact, visual cheat-sheet for the stack you're learning. Clean, no schedules — just high-value notes, snippets, and project ideas.

---

## Go (Golang) 🚀

Great for: fast binaries, networking, server backends, CLIs.

Core ideas

- Goroutines & channels (concurrency)
- Error-first returns (`error`)
- Interfaces are implicit

Snippet

```go
// goroutine + channel
ch := make(chan int)
go func() { ch <- 42 }()
fmt.Println(<-ch)
```

Ideas

- REST API with `net/http`
- CLI parser that outputs JSON

Links

- [Official site](https://go.dev/)
- [Go by Example](https://gobyexample.com/)

---

## JavaScript (ES6+) ⚡

Great for: frontend apps, tooling, fast prototyping.

Core ideas

- Promises & `async/await`
- Closures, prototypal inheritance
- ESM modules and Node tooling

Snippet

```js
// async/await
async function fetchJSON(url) {

  const res = await fetch(url)
  return res.json()
}
```

Ideas

- Single-page app consuming a public API
- Small utility library (debounce/throttle)

Links

- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## React ⚛️

Great for: component-driven UIs, reusable hooks, interactive apps.

Core ideas

- Functional components & hooks
- Lifting state, context for global state

Snippet

```jsx
function Counter() {

  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}
```

Ideas

- Notes app with localStorage sync
- Mini dashboard with charts

Links

- [React official](https://reactjs.org/)

---

## Angular 🅰️

Great for: large, opinionated apps, TypeScript-first architecture.

Core ideas

- Components, modules, services
- Dependency injection & RxJS

Snippet

```ts
@Injectable({ providedIn: 'root' })
export class Api {

  constructor(private http: HttpClient) {}
  get() { return this.http.get('/api') }
}
```

Ideas

- Task manager with reactive forms
- Admin dashboard with lazy-loaded modules

Links

- [Angular official](https://angular.io/)

---

## TypeScript 🧭

Great for: safer JS, better DX, maintainable codebases.

Core ideas

- Structural typing, interfaces, generics
- `unknown` vs `any`

Snippet

```ts
function identity<T>(v: T): T { return v }
type User = { id: number; name: string }
```

Ideas

- Add TypeScript to a JS library
- Build a typed API client

Links

- [TypeScript official](https://www.typescriptlang.org/)

---

## C++ ⚙️

Great for: performance-critical systems, games, native tooling.

Core ideas

- RAII and smart pointers
- Templates & STL

Snippet

```cpp
// vector usage
std::vector<int> v{1,2,3};
for (auto &x : v) std::cout << x << "\n";
```

Ideas

- Memory pool allocator
- Command-line parser + file processor

Links

- [cppreference](https://en.cppreference.com/)

---

Want more?

- I can create small starter repos (`/starter`) for any stack (Vite, Go module, CMake).
- Or I can add runnable example projects with README and minimal tests.

Tell me which one and I'll scaffold it.
