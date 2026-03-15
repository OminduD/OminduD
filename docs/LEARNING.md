<div align="center">

# 📚 <font color="#00ff00">_LEARNING STACK_</font>

<img src="https://capsule-render.vercel.app/api?type=waving&color=00ff00&height=150&section=header&text=ROOT/LEARNING&fontSize=50&fontAlignY=40&desc=Compiling%20Knowledge%20Base...&descAlignY=60&descSize=20&animation=fadeIn" alt="Header" />

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=700&size=20&duration=3000&pause=1000&color=00ff00&center=true&vCenter=true&random=false&width=780&lines=Loading+language+modules...;Rust+%E2%80%94+primary+focus;Go+%E2%80%94+loaded;C%2B%2B+%E2%80%94+loaded;Knowledge+base+initialized." alt="Typing Intro" />

<br/>

[![Rust](https://img.shields.io/badge/RUST-PRIMARY-000000?style=for-the-badge&logo=rust&logoColor=00ff00&labelColor=000000)](https://www.rust-lang.org/)
[![Go](https://img.shields.io/badge/GO-ACTIVE-000000?style=for-the-badge&logo=go&logoColor=00ff00&labelColor=000000)](https://go.dev/)
[![C++](https://img.shields.io/badge/C++-ACTIVE-000000?style=for-the-badge&logo=c%2B%2B&logoColor=00ff00&labelColor=000000)](https://en.cppreference.com/)

</div>

---

## <font color="#00ff00">&gt;_ [PRIMARY] RUST 🦀</font>

> **Best for:** systems programming, CLI tools, WebAssembly, high-performance services, anything that needs to be fast and safe.

<table width="100%" style="background-color: #0d0d0d; border: 1px solid #00ff00;">
  <tr>
    <td valign="top" style="border: 1px solid #00ff00; padding: 15px;">
      <b><font color="#00ff00">Core Concepts</font></b>
      <br/>► Ownership, borrowing & lifetimes
      <br/>► <code>Result&lt;T, E&gt;</code> and <code>Option&lt;T&gt;</code> — no nulls
      <br/>► Traits (like interfaces, but composable)
      <br/>► Zero-cost abstractions
      <br/>► <code>async/await</code> with Tokio for concurrency
    </td>
  </tr>
</table>

**Snippets**

```rust
// Ownership & borrowing
fn greet(s: &str) { println!("Hello, {s}!"); }
let name = String::from("Omindu");
greet(&name); // borrow, name still valid

// Result handling
fn parse_int(s: &str) -> Result<i32, std::num::ParseIntError> {
    s.trim().parse()
}
match parse_int("42") {
    Ok(n)  => println!("Got: {n}"),
    Err(e) => println!("Err: {e}"),
}

// Traits
trait Greet {
    fn hello(&self) -> String;
}
struct Bot { name: String }
impl Greet for Bot {
    fn hello(&self) -> String { format!("I am {}", self.name) }
}

// Async (Tokio)
#[tokio::main]
async fn main() {
    let result = fetch_data().await;
}
```

**Project Ideas**
- CLI tool with `clap` — file watcher, port scanner
- Async HTTP client/server with `axum` or `actix-web`
- TUI app with `ratatui` (extend `pulse`!)
- Custom memory allocator or data structure

**Key Crates**
| Crate | Use |
|---|---|
| `tokio` | Async runtime |
| `serde` | Serialization |
| `clap` | CLI argument parsing |
| `ratatui` | Terminal UI |
| `axum` | Web framework |
| `rayon` | Data parallelism |

**Links**
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Awesome Rust](https://github.com/rust-unofficial/awesome-rust)

---

## <font color="#00ff00">&gt;_ GO (GOLANG) 🚀</font>

> **Best for:** fast binaries, networking, server backends, CLIs, DevOps tooling.

<table width="100%" style="background-color: #0d0d0d; border: 1px solid #00ff00;">
  <tr>
    <td valign="top" style="border: 1px solid #00ff00; padding: 15px;">
      <b><font color="#00ff00">Core Concepts</font></b>
      <br/>► Goroutines & channels — cheap concurrency
      <br/>► Error-first returns (<code>error</code> as last return value)
      <br/>► Interfaces are implicit — duck typing
      <br/>► Simple module system (<code>go.mod</code>)
    </td>
  </tr>
</table>

**Snippets**

```go
// Goroutine + channel
ch := make(chan int)
go func() { ch <- 42 }()
fmt.Println(<-ch)

// Error handling
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Interface
type Stringer interface { String() string }
type Point struct{ X, Y int }
func (p Point) String() string { return fmt.Sprintf("(%d, %d)", p.X, p.Y) }
```

**Project Ideas**
- REST API with `net/http` or `gin`
- CLI tool (extend `arch-sandbox`!)
- Static file server with middleware

**Links**
- [go.dev](https://go.dev/)
- [Go by Example](https://gobyexample.com/)
- [Effective Go](https://go.dev/doc/effective_go)

---

## <font color="#00ff00">&gt;_ C++ ⚙️</font>

> **Best for:** performance-critical systems, game engines, native tooling, OS-level programming.

<table width="100%" style="background-color: #0d0d0d; border: 1px solid #00ff00;">
  <tr>
    <td valign="top" style="border: 1px solid #00ff00; padding: 15px;">
      <b><font color="#00ff00">Core Concepts</font></b>
      <br/>► RAII — resource cleanup through destructors
      <br/>► Smart pointers: <code>unique_ptr</code>, <code>shared_ptr</code>
      <br/>► Templates & the STL
      <br/>► Move semantics (<code>std::move</code>)
      <br/>► Modern C++20: ranges, concepts, coroutines
    </td>
  </tr>
</table>

**Snippets**

```cpp
// Smart pointer (RAII)
auto buf = std::make_unique<int[]>(1024);

// Move semantics
std::vector<int> a{1, 2, 3};
std::vector<int> b = std::move(a); // a is now empty

// Template
template<typename T>
T clamp(T val, T lo, T hi) {
    return std::max(lo, std::min(val, hi));
}

// Range-based loop
std::vector<std::string> langs{"Rust", "Go", "C++"};
for (const auto& l : langs) std::cout << l << "\n";
```

**Project Ideas**
- Memory pool / custom allocator
- Command-line parser with file processor
- Simple interpreter or expression evaluator
- Extend `MazeRunner` with more game mechanics

**Links**
- [cppreference](https://en.cppreference.com/)
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)
- [Learn C++](https://www.learncpp.com/)

---

<div align="center">

## <font color="#00ff00">&gt;_ FOCUS MAP</font>

| Language | Focus Level | Use Case |
|---|---|---|
| 🦀 Rust | `████████░░` Primary | Systems, CLI, TUI, async services |
| 🐹 Go | `██████░░░░` Active | Backends, DevOps tooling, CLI |
| ⚙️ C++ | `█████░░░░░` Active | Low-level, performance, game dev |

<br/>

<button style="background-color: transparent; border: none;">
  <a href="../README.md">
    <img src="https://img.shields.io/badge/RETURN_TO_MAIN_TERMINAL-000000?style=for-the-badge&labelColor=00ff00&color=000000" />
  </a>
</button>

<img src="https://capsule-render.vercel.app/api?type=waving&color=00ff00&height=100&section=footer" alt="Footer" />

</div>
