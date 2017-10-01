function localtunnel {
  lt -s watadarkstar --port 8000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
