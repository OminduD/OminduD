<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=00ff00&height=180&section=header&text=ROOT%2FLEARNING&fontSize=55&fontAlignY=38&fontColor=000000&desc=Compiling%20Knowledge%20Base...&descAlignY=60&descSize=18&animation=fadeIn" alt="Header" />

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=700&size=18&duration=2500&pause=800&color=00ff00&center=true&vCenter=true&random=false&width=780&lines=%5BSYS%5D+Loading+language+runtimes...;%5B+OK+%5D+Rust+%E2%80%94+PRIMARY+%5Bactive+study%5D;%5B+OK+%5D+Go+%E2%80%94+ACTIVE+%5Bbuilding+projects%5D;%5B+OK+%5D+C%2B%2B+%E2%80%94+ACTIVE+%5Bsystems+%26+games%5D;%5B+OK+%5D+Knowledge+base+initialized." alt="Boot sequence" />

<br/>

[![Rust](https://img.shields.io/badge/RUST-PRIMARY-000000?style=for-the-badge&logo=rust&logoColor=00ff00&labelColor=000000)](https://www.rust-lang.org/)
[![Go](https://img.shields.io/badge/GO-ACTIVE-000000?style=for-the-badge&logo=go&logoColor=00ff00&labelColor=000000)](https://go.dev/)
[![C++](https://img.shields.io/badge/C++-ACTIVE-000000?style=for-the-badge&logo=c%2B%2B&logoColor=00ff00&labelColor=000000)](https://en.cppreference.com/)

<br/>

<div align="center">
  <p><i>Computer Science undergraduate passionate about systems programming, Linux, and developer tooling. I enjoy building terminal-based applications, exploring algorithms, and experimenting with networking and cryptography concepts. Focused on creating efficient, minimal, and practical software while actively contributing to open-source and expanding my technical depth.</i></p>
</div>

<br/>

<table width="80%" style="background-color: #0d0d0d; border: 1px solid #333;">
  <tr>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#00ff00">🦀 Rust</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#00ff00">████████░░</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><code>PRIMARY</code> — Systems, CLI, TUI, async</td>
  </tr>
  <tr>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#00ff00">🐹 Go</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#00c800">██████░░░░</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><code>ACTIVE</code>&nbsp; — Backends, DevOps, CLI</td>
  </tr>
  <tr>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#00ff00">⚙️ C++</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#009900">█████░░░░░</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><code>ACTIVE</code>&nbsp; — Low-level, performance, games</td>
  </tr>
  <tr>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#00ff00">🌐 Networking</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#007700">████░░░░░░</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><code>STUDY</code>&nbsp; — Protocols, sockets, packet analysis</td>
  </tr>
  <tr>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#00ff00">🔐 Crypto</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><font color="#005500">███░░░░░░░</font></td>
    <td align="center" style="padding: 10px; border: 1px solid #333;"><code>STUDY</code>&nbsp; — AES, RSA, hash functions, TLS</td>
  </tr>
</table>

</div>

---

<div align="center">
<img src="https://img.shields.io/badge/▶──────────────────────────────────────────────────────▶-000000?style=for-the-badge&labelColor=de3f24&color=000000" />

## <font color="#00ff00">&gt;_ [PRIMARY] RUST 🦀</font>

<i>Systems programming, CLI tools, WebAssembly, high-performance async services.</i>
</div>

<br/>

<table width="100%" style="background-color: #0d0d0d; border: 2px solid #de3f24;">
  <tr>
    <td valign="top" style="border: 1px solid #de3f24; padding: 18px;">
      <b><font color="#00ff00">Core Concepts</font></b>
      <br/>► <b>Ownership & borrowing</b> — memory safety without a GC
      <br/>► <b>Lifetimes</b> — compiler-enforced reference validity
      <br/>► <code>Result&lt;T, E&gt;</code> and <code>Option&lt;T&gt;</code> — explicit error & null handling
      <br/>► <b>Traits</b> — composable, zero-cost interfaces
      <br/>► <b>Zero-cost abstractions</b> — high-level code, zero runtime overhead
      <br/>► <code>async/await</code> with <b>Tokio</b> — non-blocking concurrency
    </td>
  </tr>
</table>

<br/>

**Snippets**

```rust
// Ownership & borrowing
fn greet(s: &str) { println!("Hello, {s}!"); }
let name = String::from("Omindu");
greet(&name); // borrow — name still valid

// Result & the ? operator
fn read_file(path: &str) -> Result<String, std::io::Error> {
    std::fs::read_to_string(path)  // ? propagates error automatically
}

// Traits
trait Describe {
    fn describe(&self) -> String;
}
struct Tool { name: String, lang: String }
impl Describe for Tool {
    fn describe(&self) -> String {
        format!("{} written in {}", self.name, self.lang)
    }
}

// Async with Tokio
#[tokio::main]
async fn main() {
    let body = reqwest::get("https://api.github.com/users/OminduD")
        .await.unwrap()
        .text().await.unwrap();
    println!("{body}");
}

```rust
// Iterators & closures (zero-cost)
let sum: i32 = (1..=10).filter(|x| x % 2 == 0).map(|x| x * x).sum();
```

---

<div align="center">
<img src="https://img.shields.io/badge/▶──────────────────────────────────────────────────────▶-000000?style=for-the-badge&labelColor=00ff00&color=000000" />

## <font color="#00ff00">&gt;_ [STUDY] NETWORKING & CRYPTOGRAPHY 🌐🔐</font>

<i>Exploring protocols, low-level socket programming, and secure communication.</i>
</div>

<br/>

<table width="100%" style="background-color: #0d0d0d; border: 2px solid #00ff00;">
  <tr>
    <td width="50%" valign="top" style="border: 1px solid #00ff00; padding: 18px;">
      <b><font color="#00ff00">Networking Concepts</font></b>
      <br/>► <b>OSI Model</b> — Layered approach to network protocols
      <br/>► <b>TCP/UDP</b> — Reliable vs performance-oriented comms
      <br/>► <b>Sockets</b> — Interface for low-level data exchange
      <br/>► <b>HTTP/HTTPS</b> — Analyzing web traffic & headers
    </td>
    <td width="50%" valign="top" style="border: 1px solid #00ff00; padding: 18px;">
      <b><font color="#00ff00">Cryptography Concepts</font></b>
      <br/>► <b>Symmetric/Asymmetric Encryption</b> — AES, RSA
      <br/>► <b>Hashing</b> — SHA-256 for data integrity
      <br/>► <b>Digital Signatures</b> — Verifying authenticity
      <br/>► <b>TLS/SSL</b> — Implementing secure handshakes
    </td>
  </tr>
</table>

<br/>

<table width="100%" style="background-color: #0d0d0d; border: 1px solid #333;"> (existing footer table)

  <tr>
    <th align="left" style="border: 1px solid #333; padding: 8px;"><font color="#00ff00">Crate</font></th>
    <th align="left" style="border: 1px solid #333; padding: 8px;"><font color="#00ff00">Purpose</font></th>
  </tr>
  <tr>
    <td style="border: 1px solid #333; padding: 8px;"><code>tokio</code></td>
    <td style="border: 1px solid #333; padding: 8px;">Async runtime</td>
  </tr>
  <tr>
    <td style="border: 1px solid #333; padding: 8px;"><code>serde</code></td>
    <td style="border: 1px solid #333; padding: 8px;">Serialization / deserialization</td>
  </tr>
  <tr>
    <td style="border: 1px solid #333; padding: 8px;"><code>clap</code></td>
    <td style="border: 1px solid #333; padding: 8px;">CLI argument parsing</td>
  </tr>
  <tr>
    <td style="border: 1px solid #333; padding: 8px;"><code>ratatui</code></td>
    <td style="border: 1px solid #333; padding: 8px;">Terminal UI — used in <b>pulse</b></td>
  </tr>
  <tr>
    <td style="border: 1px solid #333; padding: 8px;"><code>axum</code></td>
    <td style="border: 1px solid #333; padding: 8px;">Async web framework</td>
  </tr>
  <tr>
    <td style="border: 1px solid #333; padding: 8px;"><code>rayon</code></td>
    <td style="border: 1px solid #333; padding: 8px;">Data parallelism</td>
  </tr>
</table>

<br/>

**Project Ideas**
- Extend [`pulse`](https://github.com/OminduD/pulse) — add network stats, disk I/O panels
- CLI file watcher / port scanner with `clap` + `tokio`
- Async REST API with `axum` + `serde_json`
- Custom memory allocator or lock-free data structure

**Links**
- [The Rust Book](https://doc.rust-lang.org/book/) · [Rust by Example](https://doc.rust-lang.org/rust-by-example/) · [Rustlings](https://github.com/rust-lang/rustlings) · [Awesome Rust](https://github.com/rust-unofficial/awesome-rust)

---

<div align="center">
<img src="https://img.shields.io/badge/▶──────────────────────────────────────────────────────▶-000000?style=for-the-badge&labelColor=00add8&color=000000" />

## <font color="#00ff00">&gt;_ GO (GOLANG) 🐹</font>

<i>Fast binaries, networking, server backends, CLIs, DevOps tooling.</i>
</div>

<br/>

<table width="100%" style="background-color: #0d0d0d; border: 2px solid #00add8;">
  <tr>
    <td valign="top" style="border: 1px solid #00add8; padding: 18px;">
      <b><font color="#00ff00">Core Concepts</font></b>
      <br/>► <b>Goroutines & channels</b> — cheap, built-in concurrency
      <br/>► <b>Error-first returns</b> — <code>error</code> as last return value, always explicit
      <br/>► <b>Implicit interfaces</b> — duck typing, no <code>implements</code> keyword
      <br/>► <b>Simple module system</b> — <code>go.mod</code> + <code>go.sum</code>
      <br/>► <b>Fast compilation</b> — single static binary output
    </td>
  </tr>
</table>

<br/>

**Snippets**

```go
// Goroutine + channel
ch := make(chan int)
go func() { ch <- 42 }()
fmt.Println(<-ch)

// Error handling pattern
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Implicit interface
type Stringer interface { String() string }
type Point struct{ X, Y int }
func (p Point) String() string { return fmt.Sprintf("(%d, %d)", p.X, p.Y) }

// Context for cancellation
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
req, _ := http.NewRequestWithContext(ctx, "GET", "https://api.github.com", nil)
```

**Project Ideas**
- Extend [`arch-sandbox`](https://github.com/OminduD/arch-sandbox) — add snapshot diffing, network namespaces
- REST API with `gin` or `chi` + middleware chain
- Static file server with rate limiting

**Links**
- [go.dev](https://go.dev/) · [Go by Example](https://gobyexample.com/) · [Effective Go](https://go.dev/doc/effective_go)

---

<div align="center">
<img src="https://img.shields.io/badge/▶──────────────────────────────────────────────────────▶-000000?style=for-the-badge&labelColor=00599c&color=000000" />

## <font color="#00ff00">&gt;_ C++ ⚙️</font>

<i>Performance-critical systems, game engines, native tooling, OS-level programming.</i>
</div>

<br/>

<table width="100%" style="background-color: #0d0d0d; border: 2px solid #00599c;">
  <tr>
    <td valign="top" style="border: 1px solid #00599c; padding: 18px;">
      <b><font color="#00ff00">Core Concepts</font></b>
      <br/>► <b>RAII</b> — resource cleanup tied to object lifetime via destructors
      <br/>► <b>Smart pointers</b> — <code>unique_ptr</code>, <code>shared_ptr</code>, <code>weak_ptr</code>
      <br/>► <b>Templates & STL</b> — generic programming with zero overhead
      <br/>► <b>Move semantics</b> — <code>std::move</code>, rvalue references, no copies
      <br/>► <b>Modern C++20</b> — ranges, concepts, coroutines, modules
    </td>
  </tr>
</table>

<br/>

**Snippets**

```cpp
// Smart pointer (RAII — no manual delete)
auto buf = std::make_unique<int[]>(1024);

// Move semantics (transfer ownership, no copy)
std::vector<int> a{1, 2, 3};
std::vector<int> b = std::move(a); // a is empty, no allocation

// Template with concept (C++20)
template<std::integral T>
T clamp(T val, T lo, T hi) {
    return std::max(lo, std::min(val, hi));
}

// Range-based loop with structured bindings (C++17)
std::map<std::string, int> scores{{"Rust", 95}, {"Go", 80}, {"C++", 85}};
for (const auto& [lang, score] : scores)
    std::cout << lang << ": " << score << "\n";

// Lambda + algorithm
std::vector<int> nums{5, 2, 8, 1, 9};
std::sort(nums.begin(), nums.end(), [](int a, int b){ return a > b; });
```

**Project Ideas**
- Extend [`MazeRunner`](https://github.com/OminduD/MazeRunner) — dynamic floor generation, save states
- Memory pool / custom allocator from scratch
- Simple expression evaluator / interpreter
- Command-line tool with file I/O and argument parsing

**Links**
- [cppreference](https://en.cppreference.com/) · [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines) · [Learn C++](https://www.learncpp.com/)

---

<div align="center">

<a href="../README.md">
  <img src="https://img.shields.io/badge/◀_RETURN_TO_MAIN_TERMINAL-000000?style=for-the-badge&labelColor=00ff00&color=000000" />
</a>
&nbsp;
<a href="./PROJECTS.md">
  <img src="https://img.shields.io/badge/🗃_VIEW_PROJECTS-000000?style=for-the-badge&labelColor=00c800&color=000000" />
</a>

<br/><br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=00ff00&height=100&section=footer" alt="Footer" />

</div>
